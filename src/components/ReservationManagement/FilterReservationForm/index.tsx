import MultiSelect from "@/components/common/MultiSelect";
import PhoneInput from "@/components/common/PhoneInput";
import Select from "@/components/common/Select";
import TextInput from "@/components/common/TextInput";
import useTranslation from "@/hooks/useTranslation";
import { BOOKING_STATUS_OPTIONS } from "@/services/reservation";
import useMetaDataStore from "@/stores/meta-data.store";
import { FilterProps } from "@/types";
import { convertToInternationalFormat } from "@/utils";
import { Box, Button, Flex, Stack, Text } from "@mantine/core";
import { DateInput, DateValue } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { IconCalendar } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useCallback, useMemo } from "react";
import classes from "./FilterReservationForm.module.scss";
import { BrowserView, MobileView } from "react-device-detect";

const FilterReservationForm = ({
  onFilter,
}: {
  onFilter: (filter: FilterProps) => void;
}) => {
  const t = useTranslation();
  const {
    defaultChainId,
    defaultBranchId,
    chainOptions,
    branchOptionsByChainId,
  } = useMetaDataStore();

  const form = useForm<FilterProps>({
    initialValues: {
      keyword: "",
      branchId: defaultBranchId,
      chainId: defaultChainId,
      // default 1 week
      from: dayjs() || null,
      to: dayjs().startOf("day").add(7, "day") || null,
    },
    transformValues,
  });

  const branchOptions = useMemo(
    () => branchOptionsByChainId[form.values.chainId || ""] || [],
    [branchOptionsByChainId, form.values.chainId],
  );

  const switchChain = useCallback(
    (chainId: string | null) => {
      form.setFieldValue("chainId", chainId);
      if (chainId) {
        const branchId = branchOptionsByChainId[chainId]?.[0]?.value;
        form.setFieldValue("branchId", (branchId || "").toString());
      }
    },
    [branchOptionsByChainId, form],
  );
  const onReset = useCallback(() => {
    form.reset();
    form.setFieldValue("from", undefined);
    form.setFieldValue("to", undefined);
  }, [form]);

  return (
    <div className="w-full">
      <form>
        <Stack className={classes.container}>
          <Select
            label={`${t("Select chains")}:`}
            placeholder={t("Select chains")}
            options={chainOptions}
            value={form.values.chainId || null}
            onChange={switchChain}
          />
          <Select
            placeholder={t("Select branches")}
            label={`${t("Select branches")}:`}
            options={branchOptions}
            value={form.values.branchId || null}
            onChange={(value: string | null) => {
              form.setFieldValue("branchId", value);
            }}
            onOptionSubmit={() => onFilter && onFilter(form.values)}
          />
          <MultiSelect
            translation
            label={`${t("Select status")}:`}
            placeholder={t("Select status")}
            options={BOOKING_STATUS_OPTIONS}
            value={(form.values.statuses as string[]) || []}
            onChange={(value: string[] | null) => {
              form.setFieldValue("statuses", value);
            }}
          />
          <TextInput
            label={t("Customer Name")}
            labelClassName={classes.label}
            placeholder={t("Customer Name")}
            onEnter={() => onFilter && onFilter(form.values)}
            {...form.getInputProps("keyword")}
          />
          <PhoneInput
            label={t("Phone Number")}
            labelClassName={classes.label}
            placeholder={t("Phone Number")}
            value={form.values.phone}
            onChangeValue={(phone) =>
              form.setFieldValue("phone", phone)
            }
            onEnter={() => onFilter && onFilter(form.values)}
          />
          <Stack gap={0} className="w-full">
            <Text className="font-600">{t("Order date")}</Text>
            <Flex gap={10} className="w-full" align="center">
              <DateInput
                rightSection={<IconCalendar stroke={1.5} />}
                valueFormat="DD/MM/YYYY"
                placeholder={t("From")}
                className="w-full"
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
                valueFormat="DD/MM/YYYY"
                placeholder={t("To")}
                className="w-full"
                classNames={{
                  label: "font-600 text-16",
                }}
                onChange={(value: DateValue) => {
                  const dayjsValue = value ? dayjs(value) : undefined;
                  form.setFieldValue("to", dayjsValue);
                }}
                value={
                  form.values.to
                    ? dayjs(form.values.to).toDate()
                    : null
                }
                minDate={
                  form.values.from
                    ? dayjs(form.values.from).toDate()
                    : undefined
                }
              />
            </Flex>
          </Stack>
        </Stack>
        <MobileView>
          <Box pos="absolute" bottom={30} left={0} w="100%">
            <Flex gap={10} p={16}>
              <Button
                variant="outline"
                className="w-full"
                onClick={onReset}
              >
                {t("Clear filter")}
              </Button>
              <Button
                className="w-full"
                onClick={() => onFilter && onFilter(form.values)}
              >
                {t("Apply")}
              </Button>
            </Flex>
          </Box>
        </MobileView>
      </form>
      <BrowserView>
        <Flex mt={20} w="100%" justify="end" gap={10}>
          <Button onClick={() => onFilter && onFilter(form.values)}>
            {t("Apply")}
          </Button>
          <Button variant="outline" onClick={onReset}>
            {t("Clear filter")}
          </Button>
        </Flex>
      </BrowserView>
    </div>
  );
};

export default FilterReservationForm;

const transformValues = (value: FilterProps) => {
  return {
    branchId: value.branchId || "",
    chainId: value.chainId || "",
    date: value.date || dayjs(),
    to: value.to || null,
    keyword: value.keyword || "",
    phone: convertToInternationalFormat(value.phone || ""),
    from: value.from || null,
  };
};
