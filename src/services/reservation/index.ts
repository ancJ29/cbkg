import { TAKE } from "./../../configs/constants/index";
import { FilterProps, OptionProps, Reservation } from "@/types";
import dayjs from "dayjs";
import callApi from "../api";
import { dataLoader, getCursor } from "@/utils";
import useReservationStore from "@/stores/reservation.store";

export enum STATUS_BOOKING {
  "NEW" = "NEW",
  "CONFIRMED" = "CONFIRMED",
  "CHECKED IN" = "CHECKED IN",
  "COMPLETED" = "COMPLETED",
  "CANCELED" = "CANCELED",
}

export const STATUS_BOOKING_OPTIONS: OptionProps[] = Object.values(
  STATUS_BOOKING,
).map((status) => ({
  label: status,
  value: status,
}));

export async function getReservation(
  filter?: FilterProps,
): Promise<Reservation[]> {
  const data = useReservationStore.getState().reservations;

  return data.filter((item) => {
    if (filter?.status !== undefined) {
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
    if (filter?.date && item.date?.day !== filter.date.day) {
      return false;
    }
    if (filter?.name) {
      const keyword = filter.name;
      const fullName = item?.contact || "";
      const phone = item?.phone || "";
      if (!fullName.includes(keyword) && !phone.includes(keyword)) {
        return false;
      }
    }
    if (
      filter?.date &&
      !dayjs(filter.date).isSame(item.from, "day")
    ) {
      return false;
    }

    return true;
  });
}

export async function loadReservations(): Promise<Reservation[]> {
  const reservations = useReservationStore.getState().reservations;

  const { data } = await dataLoader<Reservation>(
    TAKE,
    getCursor(reservations, "id") || "",
    _fetch,
  );
  useReservationStore.getState().loadReservation(data);
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
    data: res.data.reservation || [],
    cursor: res.data.cursor,
  };
}
