import Select from "@/components/common/Select";
import useTranslation from "@/hooks/useTranslation";
import {
  STATUS_BOOKING_OPTIONS,
  branchSelectOptions,
} from "@/services";
import useAuthStore from "@/stores/auth.store";
import useMetaDataStore from "@/stores/meta-data.store";
import { FilterProps } from "@/types";
import { Box, Button, Flex, Stack, Text } from "@mantine/core";
import { DateInput, DateValue } from "@mantine/dates";
import { useForm } from "@mantine/form";
import dayjs from "dayjs";
import { useCallback, useMemo } from "react";
import { isMobile } from "react-device-detect";
import classes from "./FilterReservationForm.module.scss";
import useWatchProp from "@/hooks/useWatchProp";
import MultiSelect from "@/components/common/MultiSelect";
import { IconCalendar } from "@tabler/icons-react";

const FilterReservationForm = ({
  filter,
  setFilter,
  onFilter,
}: {
  filter?: FilterProps;
  setFilter?: (filter: FilterProps) => void;
  onFilter?: () => void;
}) => {
  const t = useTranslation();
  const { chainOptions: chainOptions, branches } = useMetaDataStore();
  const { user } = useAuthStore();

  const form = useForm<FilterProps>({
    initialValues: _initialValues(filter),
    transformValues,
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

  useWatchProp(form.values, () => {
    setFilter &&
      setFilter({
        branchId: form.values.branchId,
        chainId: form.values.chainId,
        status: form.values.status,
        from: form.values.from,
        to: form.values.to,
      });
  });
  return (
    <form>
      <Stack className={classes.container}>
        {["ADMIN", "OWNER", "CHAIN_MANAGER"].includes(
          user?.role as string,
        ) && (
          <Select
            label={`${t("Select chains")}:`}
            placeholder={t("Select chains")}
            options={chainOptions}
            value={form.values.chainId || null}
            onChange={switchChain}
          />
        )}
        <Select
          disabled={branchOptions.length === 0}
          placeholder={t("Select branches")}
          label={`${t("Select branches")}:`}
          options={branchOptions}
          value={form.values.branchId || null}
          onChange={(value: string | null) => {
            form.setFieldValue("branchId", value);
          }}
        />
        <MultiSelect
          translation
          label={`${t("Select status")}:`}
          placeholder={t("Select status")}
          options={STATUS_BOOKING_OPTIONS}
          value={(form.values.status as string[]) || []}
          onChange={(value: string[] | null) => {
            form.setFieldValue("status", value);
          }}
        />
        <Stack gap={0}>
          <Text className="font-600">{t("Order date")}</Text>
          <Flex gap={10} className="w-full" align="center">
            <DateInput
              rightSection={<IconCalendar stroke={1.5} />}
              valueFormat="YYYY/MM/DD"
              placeholder={t("From")}
              classNames={{
                label: "font-600 text-16",
              }}
              onChange={(value: DateValue) => {
                const dayjsValue = value ? dayjs(value) : undefined;
                form.setFieldValue("from", dayjsValue);
              }}
              value={
                form.values.from
                  ? dayjs(form.values.from).toDate()
                  : null
              }
              maxDate={
                form.values.to
                  ? dayjs(form.values.to).toDate()
                  : undefined
              }
            />
            ~
            <DateInput
              rightSection={<IconCalendar stroke={1.5} />}
              valueFormat="YYYY/MM/DD"
              placeholder={t("To")}
              classNames={{
                label: "font-600 text-16",
              }}
              onChange={(value: DateValue) => {
                const dayjsValue = value ? dayjs(value) : undefined;
                form.setFieldValue("to", dayjsValue);
              }}
              value={
                form.values.to ? dayjs(form.values.to).toDate() : null
              }
              minDate={
                form.values.from
                  ? dayjs(form.values.from).toDate()
                  : undefined
              }
            />
          </Flex>
        </Stack>
        {!isMobile && (
          <div>
            <div>&nbsp;</div>
            <Button variant="outline" onClick={() => form.reset()}>
              {t("Reset")}
            </Button>
          </div>
        )}
      </Stack>
      {isMobile && (
        <Box pos="absolute" bottom={30} left={0} w="100%">
          <Flex gap={10} p={16}>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => form.reset()}
            >
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

const _initialValues = (value?: FilterProps) => {
  return {
    name: value?.name || "",
    branchId: value?.branchId || "",
    chainId: value?.chainId || "",
    date: value?.date || dayjs(),
    to: value?.to || null,
    from: value?.from || null,
  };
};

const transformValues = (value: FilterProps) => {
  return {
    name: value.name || "",
    branchId: value.branchId || "",
    chainId: value.chainId || "",
    date: value.date || dayjs(),
    to: value.to || null,
    from: value.from || null,
  };
};
