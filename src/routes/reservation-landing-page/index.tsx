import ConfirmReservationByCodeForm from "@/components/ReservationManagement/ConfirmReservationByCode";
import CreateReservationByEndUserForm from "@/components/ReservationManagement/CreateReservationByEndUser";
import AuthLayout from "@/components/layout/Auth";
import {
  addReservationByEndUser,
  confirmReservationByCode,
} from "@/services/reservation";
import { ConfirmReservation, Reservation } from "@/types";
import { Card } from "@mantine/core";
import { useState } from "react";

const ReservationLandingPage = () => {
  const [code, setCode] = useState<ConfirmReservation>({});

  return (
    <AuthLayout title="BOOKING">
      <Card>
        {Object.keys(code).length === 0 ? (
          <CreateReservationByEndUserForm
            onSubmit={async (value: Reservation) => {
              const res = (await addReservationByEndUser(
                value,
              )) as Reservation;
              !!res &&
                setCode({
                  code: res.code,
                  contact: value.contact,
                  note: value.note,
                });
            }}
          />
        ) : (
          <ConfirmReservationByCodeForm
            onSubmit={async (value: ConfirmReservation) => {
              const data = {
                ...code,
                reservationCode: value.reservationCode,
              } as ConfirmReservation;
              const res = await confirmReservationByCode(data);
              !!res && setCode({});
            }}
          />
        )}
      </Card>
    </AuthLayout>
  );
};
export default ReservationLandingPage;
