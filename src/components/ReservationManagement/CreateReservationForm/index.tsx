import PhoneInput from "@/components/common/PhoneInput";
import Select from "@/components/common/Select";
import TextInput from "@/components/common/TextInput";
import useTranslation from "@/hooks/useTranslation";
import { branchSelectOptions } from "@/services";
import useBranchStore from "@/stores/branch.store";
import useChainStore from "@/stores/chain.store";
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
import { useMemo } from "react";
import classes from "./CreateReservationForm.module.scss";
import { IconChevronDown } from "@tabler/icons-react";

const initialValues = {
  id: "",
  name: "",
  chainId: null,
  branchId: null,
};

const CreateReservationForm = () => {
  const t = useTranslation();
  const { options: chainOptions } = useChainStore();
  const { branches } = useBranchStore();

  const form = useForm<Reservation>({
    initialValues,
    transformValues: (values) => _transformValues(values),
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
            label={`${t("Select status")}:`}
            placeholder={t("Select status")}
            options={[{ value: "", label: "" }]}
            value={form.values.branchId || null}
            onChange={(e) => form.setFieldValue("branchId", e)}
          />
        </Box>
        <Box>
          <PhoneInput
            labelClassName="font-600"
            label={`${t("Phone")}:`}
            placeholder={t("Phone")}
            onChange={() => {
              throw new Error("Function not implemented.");
            }}
          />
        </Box>
        <Box>
          <TextInput
            label={`${t("Customer Name")}:`}
            placeholder={t("Customer Name")}
            labelClassName="font-600"
            {...form.getInputProps("customerName")}
          />
        </Box>
        <Flex gap={10}>
          <Box>
            <NumberInput
              label={`${t("Adult")}:`}
              min={0}
              max={100}
              classNames={{ label: "text-16" }}
              {...form.getInputProps("adult")}
            />
          </Box>
          <Box>
            <NumberInput
              label={`${t("Child")}:`}
              min={0}
              max={100}
              classNames={{ label: "text-16" }}
              {...form.getInputProps("child")}
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
                {...form.getInputProps("table")}
              />
              <Button w={40} h={36} p={0}>
                <IconChevronDown />
              </Button>
            </Flex>
          </Flex>

          <Select
            className="w-full"
            label={`${t("Object")}:`}
            placeholder={t("Object")}
            options={[{ value: "", label: "" }]}
            value={form.values.branchId || null}
            onChange={(e) => form.setFieldValue("branchId", e)}
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
      <Flex pb={12} pt={28} justify="center">
        <Button type="submit" className={classes.btn}>
          {t("Create")}
        </Button>
      </Flex>
    </form>
  );
};
export default CreateReservationForm;

function _transformValues(values: Reservation) {
  return {
    id: values.id.toString().trim(),
    name: values.name.toString().trim(),
    chainId: values.chainId && values.chainId.toString().trim(),
    branchId: values.branchId && values.branchId.toString().trim(),
  };
}
