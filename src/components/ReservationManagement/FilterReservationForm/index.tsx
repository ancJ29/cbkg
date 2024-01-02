import Select from "@/components/common/Select";
import useTranslation from "@/hooks/useTranslation";
import {
  STATUS_BOOKING_OPTIONS,
  branchSelectOptions,
} from "@/services";
import useBranchStore from "@/stores/branch.store";
import useChainStore from "@/stores/chain.store";
import { Reservation } from "@/types";
import { Box, Button, Flex, Stack } from "@mantine/core";
import { DateInput, DateValue, TimeInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { IconClock } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useCallback, useMemo } from "react";
import { isMobile } from "react-device-detect";
import classes from "./FilterReservationForm.module.scss";
import MultiSelect from "@/components/common/MultiSelect";
import useReservationStore from "@/stores/reservation.store";

const FilterReservationForm = ({
  onFilter,
}: {
  onFilter?: () => void;
}) => {
  const t = useTranslation();
  const { options: chainOptions } = useChainStore();
  const { branches } = useBranchStore();
  const { setFilter } = useReservationStore();

  const form = useForm<Reservation>({
    initialValues: {
      id: "",
      contact: "",
      chainId: null,
      branchId: null,
      status: null,
      phone: "",
      customerName: "",
      child: 0,
      adult: 0,
      from: dayjs(),
      date: dayjs(),
      tableId: "",
      object: "",
      require: "",
      note: "",
    },
  });
  const switchChain = useCallback(
    (chainId: string | null) => {
      form.setFieldValue("chainId", chainId);
      form.setFieldValue("branchId", null);
    },
    [form],
  );

  const branchOptions = useMemo(
    () => branchSelectOptions(branches, form.values.chainId || ""),
    [branches, form.values.chainId],
  );

  return (
    <form>
      <Stack className={classes.container}>
        <Select
          className={classes.input}
          label={`${t("Select chains")}:`}
          placeholder={t("Select chains")}
          options={chainOptions}
          value={form.values.chainId || null}
          onChange={switchChain}
        />
        <Select
          disabled={branchOptions.length === 0}
          placeholder={t("Select branches")}
          label={`${t("Select branches")}:`}
          options={branchOptions}
          value={form.values.branchId || null}
          onChange={(value: string | null) => {
            form.setFieldValue("branchId", value);
            setFilter({
              branchId: value || undefined,
            });
          }}
        />
        <MultiSelect
          label={`${t("Select status")}:`}
          placeholder={t("Select status")}
          options={STATUS_BOOKING_OPTIONS}
          value={(form.values.status as string[]) || []}
          onChange={(value: string[] | null) => {
            form.setFieldValue("status", value);
            setFilter({
              status: value || undefined,
            });
          }}
        />
        <DateInput
          valueFormat="YYYY/MM/DD"
          label={t("Date")}
          placeholder={t("Date")}
          classNames={{
            label: "font-600 text-16",
          }}
          onChange={(value: DateValue) => {
            const dayjsValue = value ? dayjs(value) : null;
            form.setFieldValue("date", dayjsValue);
            setFilter({
              date: dayjsValue || undefined,
            });
          }}
        />
        <Flex gap={10} className="w-full">
          <TimeInput
            className="w-full"
            label={t("From")}
            placeholder={t("From")}
            classNames={{ label: "font-600 text-16" }}
            rightSection={<IconClock size={16} stroke={1.5} />}
            {...form.getInputProps("from")}
          />
          <TimeInput
            className="w-full"
            label={t("To")}
            placeholder={t("To")}
            classNames={{ label: "font-600 text-16" }}
            rightSection={<IconClock size={16} stroke={1.5} />}
            {...form.getInputProps("to")}
          />
        </Flex>
      </Stack>
      {isMobile && (
        <Box pos="absolute" bottom={30} left={0} w="100%">
          <Flex gap={10} p={16}>
            <Button className="w-full" onClick={() => form.reset()}>
              {t("Reset")}
            </Button>
            <Button className="w-full" onClick={onFilter}>
              {t("Apply")}
            </Button>
          </Flex>
        </Box>
      )}
    </form>
  );
};
export default FilterReservationForm;
