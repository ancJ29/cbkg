import TextCenter from "@/components/common/TextCenter";
import TextInput from "@/components/common/TextInput";
import useTranslation from "@/hooks/useTranslation";
import { ConfirmReservation } from "@/types";
import { Button, Flex, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";

const ConfirmReservationByCodeForm = ({
  onSubmit,
}: {
  onSubmit: (value: ConfirmReservation) => void;
}) => {
  const t = useTranslation();
  const form = useForm<ConfirmReservation>({
    initialValues,
    validate,
    transformValues,
  });
  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack gap={20}>
        <TextCenter fz={20} className="font-600">
          {t("Please enter code")}
        </TextCenter>
        <TextInput
          label={`${t("Code")}:`}
          min={0}
          type="number"
          {...form.getInputProps("reservationCode")}
        />
        <Flex fz="0.8rem" justify="space-between">
          <Button
            type="submit"
            className="w-full"
            disabled={!form.isValid()}
          >
            OK
          </Button>
        </Flex>
      </Stack>
    </form>
  );
};
export default ConfirmReservationByCodeForm;

const initialValues = {
  reservationCode: "",
};
function validate(values: ConfirmReservation) {
  return {
    reservationCode: !values.reservationCode,
  };
}
function transformValues(values: ConfirmReservation) {
  return {
    reservationCode: values.reservationCode?.toString().trim(),
  };
}
