import TextCenter from "@/components/common/TextCenter";
import useTranslation from "@/hooks/useTranslation";
import { Reservation } from "@/types";
import { Button, Flex, NumberInput, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";

const ConfirmReservationByCodeForm = ({
  onSubmit,
}: {
  onSubmit: (value: Reservation) => void;
}) => {
  const t = useTranslation();
  const form = useForm<Reservation>({
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
        <NumberInput
          label={`${t("Code")}:`}
          min={0}
          max={100}
          classNames={{ label: "text-16" }}
          {...form.getInputProps("code")}
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
  code: "",
};
function validate(values: Reservation) {
  return {
    code: !values.code,
  };
}
function transformValues(values: Reservation) {
  return {
    code: values.code?.toString().trim(),
  };
}
