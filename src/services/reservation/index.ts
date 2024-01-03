import { FilterProps, OptionProps, Reservation } from "@/types";
import { convertToInternationalFormat, dataLoader } from "@/utils";
import dayjs from "dayjs";
import callApi, { isError } from "../api";
import { TAKE } from "./../../configs/constants/index";

export enum STATUS_BOOKING {
  "NEW" = "New",
  "CONFIRMED" = "Confirmed",
  "CHECKED IN" = "Checked in",
  "COMPLETED" = "Completed",
  "CANCELED" = "Canceled",
}

export enum STATUS_CREATE_BOOKING {
  "NEW" = "New",
  "CONFIRMED" = "Confirmed",
  "COMPLETED" = "Completed",
}

export const STATUS_BOOKING_OPTIONS: OptionProps[] = Object.keys(
  STATUS_BOOKING,
).map((key) => ({
  value: key,
  label: STATUS_BOOKING[key as keyof typeof STATUS_BOOKING],
}));

export const STATUS_CREATE_BOOKING_OPTIONS: OptionProps[] =
  Object.keys(STATUS_CREATE_BOOKING).map((key) => ({
    value: key,
    label:
      STATUS_CREATE_BOOKING[
        key as keyof typeof STATUS_CREATE_BOOKING
      ],
  }));

export enum OBJECT_BOOKING {
  "NEW" = "New",
  "OLD" = "Old",
}

export const OBJECT_BOOKING_OPTIONS: OptionProps[] = Object.keys(
  OBJECT_BOOKING,
).map((key) => ({
  value: key,
  label: OBJECT_BOOKING[key as keyof typeof OBJECT_BOOKING],
}));

// TODO: refactor this, filter in BE
export default async function getReservation(
  filter?: FilterProps,
): Promise<Reservation[]> {
  const data = await loadReservations();

  return data.filter((item) => {
    if (filter?.status && filter?.status?.length > 0) {
      if (!filter.status.includes(item?.status as string)) {
        return false;
      }
    }
    if (
      filter?.branchId &&
      item.branchId &&
      !item.branchId?.includes(filter.branchId)
    ) {
      return false;
    }
    if (filter?.name) {
      const keyword = filter.name.toLocaleLowerCase();
      const fullName = item?.contact.toLocaleLowerCase() || "";
      const phone = item?.phone?.toLocaleLowerCase() || "";
      if (!fullName.includes(keyword) && !phone.includes(keyword)) {
        return false;
      }
    }
    if (
      filter?.date &&
      !dayjs(filter.date).isSame(item.date, "day")
    ) {
      return false;
    }

    return true;
  });
}

export async function loadReservations(): Promise<Reservation[]> {
  const { data } = await dataLoader<Reservation>(TAKE, "", _fetch);
  return data;
}

async function _fetch(cursor?: string) {
  const res = await callApi({
    action: "get-reservations",
    params: {
      TAKE,
      cursor,
    },
  });
  return {
    data: res.data.reservations || [],
    cursor: res.data.cursor,
  };
}

export async function addReservation(value: Reservation) {
  const res = await callApi({
    // TODO: refactor this
    params: {
      branchId: value.branchId,
      contact: value.contact,
      phone: convertToInternationalFormat(value.phone),
      from: dayjs(value.date).format("YYYY-MM-DD"),
      note: value.note || "",
    },
    action: "add-reservation",
  });
  if (isError(res)) {
    return res.error || "Unknown error";
  }
  return true;
}
