import { ReservationStatus } from "@/auto-generated/prisma-schema";
import PhoneInput from "@/components/common/PhoneInput";
import Select from "@/components/common/Select";
import TextInput from "@/components/common/TextInput";
import TimeInput from "@/components/common/TimeInput";
import useTranslation from "@/hooks/useTranslation";
import {
  CUSTOMER_BOOKING_OPTIONS,
  STATUS_CREATE_BOOKING_OPTIONS,
  addReservation,
} from "@/services/reservation";
import useAuthStore from "@/stores/auth.store";
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
import classes from "./CreateReservationForm.module.scss";

const initialValues = {
  id: "",
  contact: "",
  chainId: null,
  branchId: null,
  status: null,
  phone: "",
  children: 0,
  adults: 1,
  time: dayjs().startOf("h").add(1, "h").format("HH:MM"),
  date: dayjs().startOf("day"), // default: today
  tableId: "",
  object: "",
  note: "",
};

const CreateReservationForm = ({
  opened,
  close,
}: {
  opened: boolean;
  close: () => void;
}) => {
  const t = useTranslation();
  const { user } = useAuthStore();
  const {
    defaultChainId,
    defaultBranchId,
    chainOptions,
    branchOptionsByChainId,
  } = useMetaDataStore();

  const form = useForm<Reservation>({
    initialValues: {
      ...initialValues,
      chainId: defaultChainId,
      branchId: defaultBranchId,
    },
    validate,
    transformValues,
  });

  const branchOptions = useMemo(
    () => branchOptionsByChainId[form.values.chainId || ""] || [],
    [branchOptionsByChainId, form.values.chainId],
  );

  const onSubmit = useCallback(
    async (reservation: Reservation) => {
      await addReservation(reservation);
      close();
    },
    [close],
  );

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
            <Select
              withAsterisk
              label={`${t("Select chains")}:`}
              placeholder={t("Select chains")}
              options={chainOptions}
              value={form.values.chainId || null}
              onChange={(e) => form.setFieldValue("chainId", e)}
            />

            <Select
              withAsterisk
              placeholder={t("Select branches")}
              label={`${t("Select branches")}:`}
              options={branchOptions}
              value={form.values.branchId || null}
              onChange={(e) => form.setFieldValue("branchId", e)}
            />
            <Select
              translation
              label={`${t("Select status")}:`}
              placeholder={t("Select status")}
              options={STATUS_CREATE_BOOKING_OPTIONS}
              classNames={{ input: "text-main" }}
              value={form.values.status as string}
              onChange={(e) =>
                form.setFieldValue("status", e as ReservationStatus)
              }
            />
            <PhoneInput
              withAsterisk
              labelClassName="font-600"
              label={`${t("Phone")}:`}
              placeholder={t("Phone")}
              value={form.values.phone}
              onChangeValue={(phone) =>
                form.setFieldValue("phone", phone)
              }
            />
            <TextInput
              withAsterisk
              label={`${t("Customer Name")}:`}
              placeholder={t("Customer Name")}
              labelClassName="font-600"
              {...form.getInputProps("contact")}
            />
            <Flex gap={10}>
              <NumberInput
                withAsterisk
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
          </Stack>
          <Stack className={classes.container_2}>
            <Flex gap={10} className="w-full">
              <TimeInput
                className="w-full"
                label={t("Order time")}
                placeholder={t("Order time")}
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
            label={`${t("Customer's request")}:`}
            placeholder={`${t("Customer's request")}`}
            {...form.getInputProps("note")}
          />
          <Stack className={classes.container_2}>
            <TextInput
              disabled
              label={`${t("Order recipient")} :`}
              value={user?.fullName}
            />
            <TextInput
              disabled
              label={`${t("Time of order receipt")} :`}
              value={dayjs().format("hh:mm DD/MM/YYYY")}
            />
          </Stack>
          <Textarea
            className={classes.container_3}
            label={`${t("Note")}:`}
            placeholder={`${t("Note")}`}
          />
        </Box>
        <Center my={20}>
          <Button type="submit" disabled={!form.isValid()}>
            {t("Create")}
          </Button>
        </Center>
      </form>
    </Modal>
  );
};
export default CreateReservationForm;

function transformValues(values: Reservation) {
  return {
    id: values.id?.trim(),
    contact: values.contact?.trim(),
    chainId: values.chainId && values.chainId.trim(),
    branchId: values.branchId && values.branchId.trim(),
    status: values.status,
    phone: convertToInternationalFormat(values.phone),
    time: values.time,
    date: values.date,
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
      `${dayjs(values.date).format("YYYY-MM-DD")} ${
        values.time
      } GMT+7`,
    ).isBefore(dayjs()),
    contact: !values.contact,
    phone: !isVietnamesePhoneNumber(values.phone),
    chainId: !values.chainId,
    branchId: !values.branchId,
    adults: !values.adults || values.adults === 0,
  };
}
