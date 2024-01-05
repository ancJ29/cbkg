import PhoneInput from "@/components/common/PhoneInput";
import Select from "@/components/common/Select";
import TextInput from "@/components/common/TextInput";
import useTranslation from "@/hooks/useTranslation";
import {
  branchSelectOptions,
  OBJECT_BOOKING_OPTIONS,
  STATUS_CREATE_BOOKING_OPTIONS,
} from "@/services";
import useBranchStore from "@/stores/branch.store";
import useMetaDataStore from "@/stores/meta-data.store";
import { Reservation } from "@/types";
import {
  Box,
  Button,
  Flex,
  NumberInput,
  Stack,
  Text,
  Textarea,
} from "@mantine/core";
import { DatePickerInput, TimeInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { IconChevronDown } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useMemo } from "react";
import classes from "./CreateReservationForm.module.scss";
import useWatchProp from "@/hooks/useWatchProp";
import { convertToInternationalFormat } from "@/utils";

const initialValues = {
  id: "",
  contact: "",
  chainId: null,
  branchId: null,
  status: "",
  phone: "",
  customerName: "",
  children: 0,
  adults: 0,
  time: "",
  date: dayjs(),
  tableId: "",
  object: "",
  require: "",
  note: "",
};

const CreateReservationForm = ({
  trigger,
  onSubmit,
}: {
  trigger: number;
  onSubmit: (value: Reservation) => void;
}) => {
  const t = useTranslation();
  const { chainOptions: chainOptions } = useMetaDataStore();
  const { branches } = useBranchStore();

  const form = useForm<Reservation>({
    initialValues,
    transformValues: _transformValues,
  });

  const branchOptions = useMemo(
    () => branchSelectOptions(branches, form.values.chainId || ""),
    [branches, form.values.chainId],
  );

  useWatchProp(trigger, () => {
    onSubmit(form.values);
  });

  return (
    <>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Stack className={classes.container}>
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
            <Select
              translation
              label={`${t("Select status")}:`}
              placeholder={t("Select status")}
              options={STATUS_CREATE_BOOKING_OPTIONS}
              classNames={{ input: "text-main" }}
              value={t(form.values.status as string)}
              onChange={(e) => form.setFieldValue("status", e)}
            />
          </Box>
          <Box>
            <PhoneInput
              labelClassName="font-600"
              label={`${t("Phone")}:`}
              placeholder={t("Phone")}
              value={form.values.phone}
              onChange={(e) => {
                form.setFieldValue("phone", e);
              }}
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
          <Flex gap={10}>
            <Box>
              <NumberInput
                label={`${t("Adult")}:`}
                min={0}
                max={100}
                classNames={{ label: "text-16" }}
                {...form.getInputProps("adults")}
              />
            </Box>
            <Box>
              <NumberInput
                label={`${t("Child")}:`}
                min={0}
                max={100}
                classNames={{ label: "text-16" }}
                {...form.getInputProps("children")}
              />
            </Box>
          </Flex>
        </Stack>
        <Stack className={classes.container_2}>
          <Flex gap={10} className="w-full">
            <TimeInput
              className="w-full"
              label={t("Time")}
              placeholder={t("Time")}
              {...form.getInputProps("time")}
            />
            <DatePickerInput
              valueFormat="YYYY/MM/DD"
              className="w-full"
              label={t("Date")}
              {...form.getInputProps("date")}
            />
          </Flex>

          <Flex gap={10}>
            <Flex direction="column" className="w-full">
              <Text className="font-600">{t("Table")}</Text>
              <Flex>
                <TextInput
                  className="w-full"
                  placeholder={t("Table")}
                  {...form.getInputProps("tableId")}
                />
                <Button w={40} h={36} p={0}>
                  <IconChevronDown />
                </Button>
              </Flex>
            </Flex>

            <Select
              translation
              className="w-full"
              label={`${t("Object")}:`}
              placeholder={t("Object")}
              options={OBJECT_BOOKING_OPTIONS}
              value={form.values.object || null}
              onChange={(e) => form.setFieldValue("object", e)}
            />
          </Flex>
        </Stack>
        <Textarea
          className={classes.container_3}
          label={`${t("Required")}:`}
          placeholder={`${t("Required")}:`}
          {...form.getInputProps("required")}
        />
        <Textarea
          className={classes.container_3}
          label={`${t("Note")}:`}
          placeholder={`${t("Note")}:`}
          {...form.getInputProps("note")}
        />
      </form>
    </>
  );
};
export default CreateReservationForm;

function _transformValues(values: Reservation) {
  return {
    id: values.id?.toString().trim(),
    contact: values.contact?.toString().trim(),
    chainId: values.chainId && values.chainId.toString().trim(),
    branchId: values.branchId && values.branchId.toString().trim(),
    status: values.status,
    phone: convertToInternationalFormat(values.phone),
    customerName: values.customerName?.trim(),
    time: values.time,
    date: values.date,
    tableId: values.tableId?.trim(),
    object: values.object?.trim(),
    note: values.note?.trim() as string,
  };
}
