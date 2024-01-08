import MultiSelect from "@/components/common/MultiSelect";
import PhoneInput from "@/components/common/PhoneInput";
import Select from "@/components/common/Select";
import TextInput from "@/components/common/TextInput";
import useTranslation from "@/hooks/useTranslation";
import useWatchProp from "@/hooks/useWatchProp";
import { BOOKING_STATUS_OPTIONS } from "@/services/reservation";
import useMetaDataStore from "@/stores/meta-data.store";
import { FilterProps } from "@/types";
import { convertToInternationalFormat } from "@/utils";
import { Box, Button, Flex, Stack, Text } from "@mantine/core";
import { DateInput, DateValue } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { IconCalendar } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useCallback, useMemo, useState } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import classes from "./FilterReservationForm.module.scss";

const FilterReservationForm = ({
  onFilter,
}: {
  onFilter?: (filter: FilterProps) => void;
}) => {
  const t = useTranslation();
  const {
    defaultChainId,
    defaultBranchId,
    chainOptions,
    branchOptionsByChainId,
  } = useMetaDataStore();
  const [filter, setFilter] = useState<FilterProps>({
    chainId: defaultChainId,
    branchId: defaultBranchId,
  });
  const form = useForm<FilterProps>({
    initialValues: {
      keyword: "",
      branchId: defaultBranchId,
      chainId: defaultChainId,
      date: dayjs(),
      from: null,
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
    <div>
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
          />
          <MultiSelect
            translation
            label={`${t("Select status")}:`}
            placeholder={t("Select status")}
            options={BOOKING_STATUS_OPTIONS}
            value={(form.values.status as string[]) || []}
            onChange={(value: string[] | null) => {
              form.setFieldValue("status", value);
            }}
          />
          <TextInput
            label={t("Customer Name")}
            labelClassName={classes.label}
            placeholder={t("Customer Name")}
            value={form.values.keyword}
            onChange={(e) => {
              form.setFieldValue("keyword", e.target.value);
            }}
          />
          <PhoneInput
            label={t("Phone Number")}
            labelClassName={classes.label}
            placeholder={t("Phone Number")}
            value={form.values.phone}
            onChangeValue={(phone) =>
              form.setFieldValue("phone", phone)
            }
          />
          <Stack gap={0}>
            <Text className="font-600">{t("Order date")}</Text>
            <Flex gap={10} className="w-full" align="center">
              <DateInput
                rightSection={<IconCalendar stroke={1.5} />}
                valueFormat="DD/MM/YYYY"
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
                valueFormat="DD/MM/YYYY"
                placeholder={t("To")}
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
                onClick={() => form.reset()}
              >
                {t("Clear filter")}
              </Button>
              <Button
                className="w-full"
                onClick={() => onFilter && onFilter(filter)}
              >
                {t("Apply")}
              </Button>
            </Flex>
          </Box>
        </MobileView>
      </form>
      <BrowserView>
        <Flex mt={20} pr={10} w="100%" justify="end" gap={10}>
          <Button
            onClick={() => {
              onFilter && form.onSubmit(onFilter)();
            }}
          >
            {t("Apply")}
          </Button>
          <Button variant="outline" onClick={form.reset}>
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
