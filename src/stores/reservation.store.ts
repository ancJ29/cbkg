import { Reservation } from "@/types";
import { create } from "zustand";

type ReservationStore = {
  reservations: Reservation[];
};

export default create<ReservationStore>(() => ({
  reservations: [],
}));
