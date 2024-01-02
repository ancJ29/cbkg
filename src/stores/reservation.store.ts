import callApi, { isError } from "@/services/api";
import { Reservation } from "@/types";
import {
  convertToInternationalFormat,
  generateMap,
  sortByKey,
  uniqueByKey,
} from "@/utils";
import { create } from "zustand";

type ReservationStore = {
  reservations: Reservation[];
  loadReservation: (value: Reservation[]) => void;
  addReservation: (value: Reservation) => Promise<string | undefined>;
};

export default create<ReservationStore>((set, get) => ({
  reservations: [],
  loadReservation: async (data: Reservation[]) => {
    set(() => ({ reservations: data }));
  },
  addReservation: async (value: Reservation) => {
    const res = await callApi({
      // TODO: refactor this
      params: {
        branchId: value.branchId,
        contact: value.contact,
        phone: convertToInternationalFormat(value.phone),
        from: value.date,
        note: value.note || "",
      },
      action: "add-reservation",
    });
    if (isError(res)) {
      return res.error || "Unknown error";
    }
    const reservation = get().reservations;
    reservation.push(value);
    _update(reservation, set);
  },
}));

function _update(
  _reservation: Reservation[],
  setter: (
    fn: () => {
      reservations: Reservation[];
      branchesById: { [key: string]: Reservation };
    },
  ) => void,
) {
  const reservations = sortByKey(
    uniqueByKey(_reservation, "id"),
    "id",
  );
  const branchesById = generateMap<Reservation>(reservations);
  setter(() => ({
    reservations,
    branchesById,
  }));
}
