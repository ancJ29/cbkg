/* eslint-disable @typescript-eslint/indent */
import useMetaDataStore from "@/stores/meta-data.store";
import { FilterProps, OptionProps, Reservation } from "@/types";
import { convertToInternationalFormat } from "@/utils";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import callApi from "../api";
import { TAKE } from "@/configs/constants";

export enum BOOKING_STATUS {
  "PENDING" = "Pending",
  "CONFIRMED" = "Confirmed",
  "RESERVED" = "Reserved",
  "ARRIVED" = "Arrived",
  "COMPLETED" = "Completed",
  "CANCELLED" = "Cancelled",
}

export enum STATUS_CREATE_BOOKING {
  "PENDING" = "Pending",
  "CONFIRMED" = "Confirmed",
  "COMPLETED" = "Completed",
}

export enum CUSTOMER_BOOKING {
  "NEW" = "New Customer",
  "OLD" = "Old Customer",
}

export const BOOKING_STATUS_OPTIONS: OptionProps[] = Object.keys(
  BOOKING_STATUS,
).map((key) => ({
  value: key,
  label: BOOKING_STATUS[key as keyof typeof BOOKING_STATUS],
}));

export const STATUS_CREATE_BOOKING_OPTIONS: OptionProps[] =
  Object.keys(STATUS_CREATE_BOOKING).map((key) => {
    const _key = key as keyof typeof STATUS_CREATE_BOOKING;
    const label = STATUS_CREATE_BOOKING[_key];
    return { value: key, label };
  });

export const CUSTOMER_BOOKING_OPTIONS: OptionProps[] = Object.keys(
  CUSTOMER_BOOKING,
).map((key) => ({
  value: key,
  label: CUSTOMER_BOOKING[key as keyof typeof CUSTOMER_BOOKING],
}));

// TODO: refactor this, filter in BE
export default async function getReservation(
  filter?: FilterProps,
  cursor?: string,
): Promise<{ data: Reservation[]; cursor?: string }> {
  let status: string[] = [];
  if (filter?.statuses) {
    if (Array.isArray(filter.status) && filter?.status?.length) {
      status = filter.statuses;
    } else if (typeof filter.status === "string") {
      status = [filter.status];
    }
  }
  const { data, cursor: _cursor } = await _loadReservations({
    cursor,
    name: filter?.keyword?.trim() || undefined,
    phone: convertToInternationalFormat(filter?.phone) || undefined,
    branchId: filter?.branchId || undefined,
    statuses: status.length > 0 ? status : undefined,
    from: filter?.from ? dayjs(filter.from).toISOString() : undefined,
    to: filter?.to ? dayjs(filter.to).toISOString() : undefined,
  });

  // TODO: filter keyword in BE
  let _data = data.filter((item) => {
    if (filter?.keyword) {
      const keyword = filter.keyword.trim().toLocaleLowerCase();
      const fullName = item?.contact?.toLocaleLowerCase() || "";
      const phone = item?.phone?.toLocaleLowerCase() || "";
      if (!fullName.includes(keyword) && !phone.includes(keyword)) {
        return false;
      }
    }
    return true;
  });

  const { chainsById, branchesById } = useMetaDataStore.getState();
  _data = _data.map((el) => {
    if (el.branchId) {
      el.branch = branchesById[el.branchId];
    }
    if (el?.chainId) {
      el.chain = chainsById[el.chainId];
    }
    // TODO @hau: save in BE
    el.time = dayjs(el.from).format("HH:mm");
    return el;
  });

  return { data: _data, cursor: _cursor };
}

export async function _loadReservations({
  cursor,
  branchId,
  statuses,
  name,
  phone,
  from,
  to,
}: {
  from?: string;
  to?: string;
  name?: string;
  statuses?: string[];
  phone?: string;
  branchId?: string;
  cursor?: string;
} = {}): Promise<{ data: Reservation[]; cursor?: string }> {
  const res = await callApi<
    unknown,
    { reservations: Reservation[]; cursor: string }
  >({
    action: "get-reservations",
    params: {
      take: TAKE,
      cursor,
      phone,
      name,
      branchIds: branchId ? [branchId] : undefined,
      statuses,
      from,
      to,
    },
    options: {
      noCache: true,
    },
  });
  return { data: res?.reservations || [], cursor: res?.cursor };
}

export async function addReservation(value: Reservation) {
  const from = new Date(
    `${dayjs(value.date).format("YYYY-MM-DD")} ${value.time} GMT+7`,
  );

  if (from.getTime() < Date.now()) {
    toast("Invalid time");
    return;
  }
  const res = await callApi<Reservation, string>({
    // TODO: refactor this
    params: {
      branchId: value.branchId,
      contact: value.contact,
      phone: convertToInternationalFormat(value.phone),
      from: from.toISOString(),
      note: value.note || "",
      children: value.children || 0,
      adults: value.adults || 0,
      status: value.status,
    },
    action: "add-reservation",
    options: {
      showToastMessage: true,
    },
  });
  return res;
}

export async function addReservationByEndUser(params: Reservation) {
  if (
    dayjs(
      `${dayjs(params.date).format("YYYY-MM-DD")} ${params.time}`,
    ).isBefore(dayjs())
  ) {
    toast("Invalid time");
    return;
  }
  return await callApi<Reservation, string>({
    action: "add-reservation-by-end-user",
    options: { showToastMessage: true },
    params,
  });
}

export async function confirmReservationByCode(params: Reservation) {
  if (
    dayjs(
      `${dayjs(params.date).format("YYYY-MM-DD")} ${params.time}`,
    ).isBefore(dayjs())
  ) {
    toast("Invalid time");
    return;
  }
  return await callApi<Reservation, string>({
    action: "confirm-reservation-by-code",
    options: { showToastMessage: true },
    params,
  });
}

export async function updateReservation(value: Reservation) {
  const res = await callApi<Reservation, string>({
    // TODO: call api
    params: value,
    action: "update-reservation",
    options: {
      showToastMessage: true,
    },
  });
  return res;
}
