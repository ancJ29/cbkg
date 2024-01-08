import PhoneInput from "@/components/common/PhoneInput";
import Select from "@/components/common/Select";
import TextInput from "@/components/common/TextInput";
import useTranslation from "@/hooks/useTranslation";
import useMetaDataStore from "@/stores/meta-data.store";
import { Reservation } from "@/types";
import {
  convertToInternationalFormat,
  isVietnamesePhoneNumber,
} from "@/utils";
import {
  Box,
  Button,
  Flex,
  NumberInput,
  Stack,
  Textarea,
} from "@mantine/core";
import { DatePickerInput, TimeInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import dayjs from "dayjs";
import { useMemo } from "react";

const CreateReservationByEndUserForm = ({
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
  const { chainOptions, branchOptionsByChainId } = useMetaDataStore();
  const branchOptions = useMemo(
    () => branchOptionsByChainId[form.values.chainId || ""] || [],
    [branchOptionsByChainId, form.values.chainId],
  );

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack gap={20}>
        <Box>
          <Select
            label={`${t("Select chains")}:`}
            placeholder={t("Select chains")}
            options={chainOptions}
            value={form.values.chainId || null}
            onChange={(e) => form.setFieldValue("chainId", e)}
          />
        </Box>
        <Box>
          <Select
            disabled={branchOptions.length === 0}
            placeholder={t("Select branches")}
            label={`${t("Select branches")}:`}
            options={branchOptions}
            value={form.values.branchId || null}
            onChange={(e) => form.setFieldValue("branchId", e)}
          />
        </Box>

        <Box>
          <PhoneInput
            labelClassName="font-600"
            label={`${t("Phone")}:`}
            placeholder={t("Phone")}
            value={form.values.phone}
            onChangeValue={(phone) =>
              form.setFieldValue("phone", phone)
            }
          />
        </Box>
        <Box>
          <TextInput
            label={`${t("Customer Name")}:`}
            placeholder={t("Customer Name")}
            labelClassName="font-600"
            {...form.getInputProps("contact")}
          />
        </Box>
        <Flex gap={10} className="w-full">
          <NumberInput
            label={`${t("Adult")}:`}
            min={0}
            max={100}
            classNames={{ label: "text-16" }}
            {...form.getInputProps("adults")}
          />
          <NumberInput
            label={`${t("Child")}:`}
            min={0}
            max={100}
            classNames={{ label: "text-16" }}
            {...form.getInputProps("children")}
          />
        </Flex>
        <Flex gap={10} className="w-full">
          <TimeInput
            className="w-full"
            label={t("Time")}
            placeholder={t("Time")}
            {...form.getInputProps("time")}
          />
          <DatePickerInput
            valueFormat="DD/MM/YYYY"
            className="w-full"
            label={t("Date")}
            {...form.getInputProps("date")}
            minDate={dayjs().toDate()}
          />
        </Flex>
        <Textarea
          label={`${t("Note")}:`}
          placeholder={`${t("Note")}:`}
          {...form.getInputProps("note")}
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
export default CreateReservationByEndUserForm;

const initialValues = {
  contact: "",
  chainId: null,
  branchId: null,
  phone: "",
  children: undefined,
  adults: 0,
  time: "",
  date: dayjs(),
  note: "",
};

function validate(values: Reservation) {
  return {
    contact: !values.contact,
    phone: !isVietnamesePhoneNumber(values.phone),
    chainId: !values.chainId,
    branchId: !values.branchId,
    adults: !values.adults || values.adults === 0,
    from: dayjs(
      `${dayjs(values.date).format("YYYY-MM-DD")} ${values.time}`,
    ).isBefore(dayjs()),
  };
}
function transformValues(values: Reservation) {
  return {
    branchId: values.branchId,
    contact: values.contact?.toString().trim(),
    phone: convertToInternationalFormat(values.phone),
    time: values.time,
    date: values.date,
    children: values.children || undefined,
    adults: values.adults || 0,
    from: `${dayjs(values.date).format("YYYY-MM-DD")} ${values.time}`,
    note: values.note?.trim() as string,
  };
}
