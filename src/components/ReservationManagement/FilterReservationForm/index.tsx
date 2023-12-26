import { Box, Flex, Stack } from "@mantine/core";
import classes from "./FilterReservationForm.module.scss";
import Select from "@/components/common/Select";
import useTranslation from "@/hooks/useTranslation";
import useBranchStore from "@/stores/branch.store";
import useChainStore from "@/stores/chain.store";
import { useMemo } from "react";
import { branchSelectOptions } from "@/services";
import { useForm } from "@mantine/form";
import { DateInput, TimeInput } from "@mantine/dates";

const FilterReservationForm = () => {
  const t = useTranslation();
  const { options: chainOptions } = useChainStore();
  const { branches } = useBranchStore();

  const form = useForm({
    initialValues: { chainId: null, branchId: "" },
  });

  const branchOptions = useMemo(
    () => branchSelectOptions(branches, form.values.chainId || ""),
    [branches, form.values.chainId],
  );
  return (
    <form>
      <Stack className={classes.container}>
        <Box>
          <Select
            label={`${t("Select chains")}:`}
            placeholder={t("Select chains")}
            options={chainOptions}
            value={form.values.chainId || null}
          />
        </Box>
        <Box>
          <Select
            disabled={branchOptions.length === 0}
            placeholder={t("Select branches")}
            label={`${t("Select branches")}:`}
            options={branchOptions}
            value={form.values.branchId || null}
          />
        </Box>
        <DateInput
          valueFormat="YYYY MMM DD"
          label="Date input"
          placeholder="Date input"
        />
        <Flex gap={10} className="w-full">
          <TimeInput
            className="w-full"
            label={t("Time")}
            placeholder={t("Time")}
            {...form.getInputProps("from")}
          />
          <TimeInput
            className="w-full"
            label={t("Time")}
            placeholder={t("Time")}
            {...form.getInputProps("to")}
          />
        </Flex>

        <Box>
          <Select
            label={`${t("Select status")}:`}
            placeholder={t("Select status")}
            options={[{ value: "", label: "" }]}
            value={form.values.branchId || null}
          />
        </Box>
      </Stack>
    </form>
  );
};
export default FilterReservationForm;
