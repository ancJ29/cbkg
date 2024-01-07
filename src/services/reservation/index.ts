import useMetaDataStore from "@/stores/meta-data.store";
import { FilterProps, OptionProps, Reservation } from "@/types";
import { convertToInternationalFormat } from "@/utils";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import callApi from "../api";

export enum BOOKING_STATUS {
  "PENDING" = "Pending",
  "CONFIRMED" = "Confirmed",
  "RESERVED" = "Reserved",
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

export const OBJECT_BOOKING_OPTIONS: OptionProps[] = Object.keys(
  CUSTOMER_BOOKING,
).map((key) => ({
  value: key,
  label: CUSTOMER_BOOKING[key as keyof typeof CUSTOMER_BOOKING],
}));

// TODO: refactor this, filter in BE
export default async function getReservation(
  filter?: FilterProps,
  cursor?: string,
): Promise<Reservation[]> {
  let status: string[] = [];
  if (filter?.status) {
    if (Array.isArray(filter.status) && filter?.status?.length) {
      status = filter.status;
    } else if (typeof filter.status === "string") {
      status = [filter.status];
    }
  }
  let data = await _loadReservations({
    cursor,
    phone: filter?.phone || undefined,
    branchId: filter?.branchId || undefined,
    statuses: status.length > 0 ? status : undefined,
    from: filter?.from ? dayjs(filter.from).toISOString() : undefined,
    to: filter?.to ? dayjs(filter.to).toISOString() : undefined,
  });

  // TODO: filter keyword in BE
  data = data.filter((item) => {
    if (filter?.keyword) {
      const keyword = filter.keyword.toLocaleLowerCase();
      const fullName = item?.contact?.toLocaleLowerCase() || "";
      const phone = item?.phone?.toLocaleLowerCase() || "";
      if (!fullName.includes(keyword) && !phone.includes(keyword)) {
        return false;
      }
    }
    return true;
  });

  const { chainsById, branchesById } = useMetaDataStore.getState();

  return data.map((el) => {
    if (el.branchId) {
      el.branch = branchesById[el.branchId];
    }
    if (el?.chainId) {
      el.chain = chainsById[el.chainId];
    }
    return el;
  });
}

async function _loadReservations({
  cursor,
  branchId,
  statuses,
  from,
  to,
}: {
  from?: string;
  to?: string;
  statuses?: string[];
  phone?: string;
  branchId?: string;
  cursor?: string;
} = {}): Promise<Reservation[]> {
  const res = await callApi<unknown, { reservations: Reservation[] }>(
    {
      action: "get-reservations",
      params: {
        take: 100,
        cursor,
        branchIds: branchId ? [branchId] : undefined,
        statuses,
        from,
        to,
      },
      options: {
        noCache: true,
      },
    },
  );
  return res?.reservations || [];
}

export async function addReservation(value: Reservation) {
  if (
    dayjs(
      `${dayjs(value.date).format("YYYY-MM-DD")} ${value.time}`,
    ).isBefore(dayjs())
  ) {
    toast("Invalid time");
    return;
  }
  const res = await callApi<Reservation, string>({
    // TODO: refactor this
    params: {
      branchId: value.branchId,
      contact: value.contact,
      phone: convertToInternationalFormat(value.phone),
      from: `${dayjs(value.date).format("YYYY-MM-DD")} ${value.time}`,
      note: value.note || "",
      children: value.children,
      adults: value.adults,
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
