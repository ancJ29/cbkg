import ConfirmPopup from "@/components/common/ConfirmPopup";
import ErrorMessage from "@/components/common/ErrorMessage";
import Select from "@/components/common/Select";
import useTranslation from "@/hooks/useTranslation";
import useWatchProp from "@/hooks/useWatchProp";
import {
  convertToInternationalFormat,
  isVietnamesePhoneNumber,
} from "@/services";
import useChainStore from "@/stores/chain.store";
import { Branch } from "@/types";
import { Box, Button, Center, Stack, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useCallback, useMemo } from "react";
import classes from "./Form.module.scss";
import TextInput from "@/components/common/TextInput";
import useBranchStore from "@/stores/branch.store";
import PhoneInput from "@/components/common/PhoneInput";

const BranchForm = ({
  branch,
  onSave,
  action,
}: {
  branch?: Branch;
  onSave?: (value: Branch) => void;
  action?: string;
}) => {
  const t = useTranslation();
  const { options: OPTION_CHAIN } = useChainStore();
  const { error } = useBranchStore();
  const [open, { close: close, open: openModalConfirm }] =
    useDisclosure(false);

  const form = useForm<Branch>({
    initialValues: {
      id: branch?.id || "",
      name: branch?.name || "",
      shortName: branch?.shortName || "",
      address: branch?.address || "",
      phone: branch?.phone || "",
      email: branch?.email || "",
      chainId: branch?.chainId || null,
    },
  });

  const isValid = useMemo(() => {
    const values = form.values;
    const validationErrors = {
      name: !values.name ? t("Please enter name") : null,
      address: !values.address ? t("Please enter address") : null,
      phone: !isVietnamesePhoneNumber(form.values.phone as string)
        ? t("Please enter phone")
        : null,
      email: !values.email ? t("Please enter email") : null,
      chainId: !values.chainId ? t("Please select chain") : null,
    };

    const hasErrors = Object.values(validationErrors).some(
      (error) => error !== null,
    );

    return !hasErrors;
  }, [form, t]);

  const onSubmit = useCallback(
    (value: Branch) => {
      const data = {
        ...value,
        phone: convertToInternationalFormat(value.phone),
      };
      onSave && onSave(data);
      !error && form.reset();
    },
    [error, form, onSave],
  );

  useWatchProp(error, () => {
    !error && form.reset();
  });

  return (
    <>
      <form onSubmit={form.onSubmit(() => openModalConfirm())}>
        <Stack gap={10} px={10} mt={10}>
          <div className={classes.inputContainer}>
            <Text>{t("Name")}:</Text>
            <TextInput
              className={classes.input}
              withAsterisk
              placeholder={t("Name")}
              {...form.getInputProps("name")}
            />
          </div>
          <div className={classes.inputContainer}>
            <Text>{t("Short Name")}:</Text>
            <TextInput
              className={classes.input}
              withAsterisk
              placeholder={t("Short Name")}
              {...form.getInputProps("shortName")}
            />
          </div>
          <div className={classes.inputContainer}>
            <Text>{t("Phone Number")}:</Text>
            <PhoneInput
              className={classes.input}
              placeholder="Phone number"
              value={form.values.phone}
              onChange={(e) => form.setFieldValue("phone", e)}
            />
          </div>
          <div className={classes.inputContainer}>
            <Text>{t("Email")}:</Text>
            <TextInput
              className={classes.input}
              withAsterisk
              placeholder={t("Email")}
              {...form.getInputProps("email")}
            />
          </div>
          <div className={classes.inputContainer}>
            <Text>{t("Address")}:</Text>
            <TextInput
              className={classes.input}
              withAsterisk
              placeholder={t("Address")}
              {...form.getInputProps("address")}
            />
          </div>
          <Box className={classes.inputContainer}>
            <Text>{t("Select chains")}:</Text>
            <Select
              placeholder={t("Select chains")}
              options={OPTION_CHAIN}
              className={classes.input}
              value={form.values.chainId}
              onChange={(value) =>
                form.setValues({ chainId: value as string })
              }
            />
          </Box>
          <div className={classes.inputContainer}>
            <Center className="w-full">
              <Button
                type="submit"
                disabled={!isValid}
                className={classes.btn}
                onClick={openModalConfirm}
              >
                {t(action || "Create")}
              </Button>
            </Center>
          </div>
          <ErrorMessage message={error as string} />
        </Stack>
        <ConfirmPopup
          title={t("Confirm")}
          description={`${t("Add branch ")} "${form.values.name}"`}
          open={isValid && open}
          onClose={close}
          onSave={() => onSubmit(form.values)}
        />
      </form>
    </>
  );
};
export default BranchForm;
