import { ReservationStatus } from "@/auto-generated/prisma-schema";
import PhoneInput from "@/components/common/PhoneInput";
import Select from "@/components/common/Select";
import TextInput from "@/components/common/TextInput";
import TimeInput from "@/components/common/TimeInput";
import useTranslation from "@/hooks/useTranslation";
import {
  BOOKING_STATUS_OPTIONS,
  CUSTOMER_BOOKING_OPTIONS,
  updateReservation,
} from "@/services/reservation";
import useMetaDataStore from "@/stores/meta-data.store";
import { Reservation } from "@/types";
import {
  convertToInternationalFormat,
  isVietnamesePhoneNumber,
} from "@/utils";
import {
  Box,
  Button,
  Center,
  Flex,
  Modal,
  NumberInput,
  Stack,
  Text,
  Textarea,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { IconChevronDown } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useCallback, useMemo } from "react";
import classes from "./EditReservationForm.module.scss";

// TODO: remove it, merge with create form
const EditReservationForm = ({
  opened,
  close,
  data,
}: {
  opened: boolean;
  close: () => void;
  data: Reservation;
}) => {
  const t = useTranslation();
  const { chainOptions, branchOptionsByChainId } = useMetaDataStore();

  const form = useForm<Reservation>({
    initialValues: initialValues(data),
    validate,
    transformValues,
  });

  const branchOptions = useMemo(
    () => branchOptionsByChainId[form.values.chainId || ""] || [],
    [branchOptionsByChainId, form.values.chainId],
  );

  const onSubmit = useCallback(
    async (reservation: Reservation) => {
      const res = await updateReservation(reservation);
      !!res && close();
    },
    [close],
  );

  const disabledDateTime = useMemo(() => {
    const date = new Date(
      `${dayjs(data.date).format("YYYY-MM-DD")} ${data.time} GMT+7`,
    );
    return dayjs(date).isBefore(dayjs());
  }, [data.date, data.time]);

  return (
    <Modal
      onClose={close}
      opened={opened}
      size="60rem"
      centered
      title={t("Reserve")}
      padding={0}
      classNames={{ header: classes.header, title: "font-bold" }}
    >
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Box className={classes.body}>
          <Box className="bdr-t" pb={10}></Box>
          <Stack className={classes.container}>
            <Box>
              <Select
                disabled
                label={`${t("Select chains")}:`}
                placeholder={t("Select chains")}
                options={chainOptions}
                value={form.values.chainId || null}
              />
            </Box>
            <Box>
              <Select
                disabled
                placeholder={t("Select branches")}
                label={`${t("Select branches")}:`}
                options={branchOptions}
                value={form.values.branchId || null}
              />
            </Box>
            <Box>
              <Select
                translation
                label={`${t("Select status")}:`}
                placeholder={t("Select status")}
                options={BOOKING_STATUS_OPTIONS}
                classNames={{ input: "text-main" }}
                value={form.values.status as string}
                onChange={(e) =>
                  form.setFieldValue("status", e as ReservationStatus)
                }
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
                disabled={disabledDateTime}
                className="w-full"
                label={t("Time")}
                placeholder={t("Time")}
                {...form.getInputProps("time")}
              />
              <DatePickerInput
                disabled={disabledDateTime}
                valueFormat="DD/MM/YYYY"
                className="w-full"
                label={t("Date")}
                {...form.getInputProps("date")}
                minDate={dayjs().toDate()}
              />
            </Flex>

            <Flex gap={10}>
              {/* TODO: table */}
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
                options={CUSTOMER_BOOKING_OPTIONS}
                value={form.values.object || null}
                onChange={(e) => form.setFieldValue("object", e)}
              />
            </Flex>
          </Stack>
          <Textarea
            className={classes.container_3}
            label={`${t("Note")}:`}
            placeholder={`${t("Note")}:`}
            {...form.getInputProps("note")}
          />
        </Box>
      </form>
      <Center my={20}>
        <Button
          onClick={() => form.onSubmit(onSubmit)()}
          disabled={!form.isValid()}
        >
          {t("Update")}
        </Button>
      </Center>
    </Modal>
  );
};
export default EditReservationForm;

function transformValues(values: Reservation) {
  return {
    contact: values.contact?.toString().trim(),
    chainId: values.chainId && values.chainId.toString().trim(),
    branchId: values.branchId && values.branchId.toString().trim(),
    status: values.status,
    phone: convertToInternationalFormat(values.phone),
    time: values.time,
    from: values.date,
    code: values.code,
    adults: values.adults || 0,
    children: values.children || 1,
    tableId: values.tableId?.trim(),
    object: values.object?.trim(),
    note: values.note?.trim() as string,
  };
}

function validate(values: Reservation) {
  return {
    status: !values.status,
    time: !values.time,
    date: dayjs(
      `${dayjs(values.date).format("DD-MM-YYYY")}`,
    ).isBefore(dayjs()),
    contact: !values.contact,
    phone: !isVietnamesePhoneNumber(values.phone),
    chainId: !values.chainId,
    branchId: !values.branchId,
    adults: !values.adults || values.adults === 0,
  };
}
const initialValues = (value: Reservation) => {
  return {
    code: value.code || "",
    contact: value.contact || "",
    chainId: value.chainId || null,
    branchId: value.branchId || null,
    status: value.status || null,
    phone: value.phone || "",
    children: value.children || 0,
    adults: value.adults || 1,
    time: value.time,
    date: value.date
      ? dayjs(value.date)
      : dayjs().startOf("day").add(1, "day"),
    tableId: value.tableId || "",
    object: value.object || "",
    note: value.note || "",
  };
};
