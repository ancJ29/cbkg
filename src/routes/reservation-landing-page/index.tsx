import ConfirmReservationByCodeForm from "@/components/ReservationManagement/ConfirmReservationByCode";
import CreateReservationByEndUserForm from "@/components/ReservationManagement/CreateReservationByEndUser";
import AuthLayout from "@/components/layout/Auth";
import {
  addReservationByEndUser,
  confirmReservationByCode,
} from "@/services/reservation";
import { Reservation } from "@/types";
import { Card } from "@mantine/core";
import { useToggle } from "usehooks-ts";

const ReservationLandingPage = () => {
  const [confirmCode, toggle] = useToggle(false);

  return (
    <AuthLayout title="BOOKING">
      <Card>
        {confirmCode ? (
          <CreateReservationByEndUserForm
            onSubmit={async (value: Reservation) => {
              const res = await addReservationByEndUser(value);
              !!res && toggle();
            }}
          />
        ) : (
          <ConfirmReservationByCodeForm
            onSubmit={async (value: Reservation) => {
              const res = await confirmReservationByCode(value);
              !!res && toggle();
            }}
          />
        )}
      </Card>
    </AuthLayout>
  );
};
export default ReservationLandingPage;
