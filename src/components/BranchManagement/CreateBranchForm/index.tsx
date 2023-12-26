import useTranslation from "@/hooks/useTranslation";
import {
  Box,
  Button,
  Card,
  Center,
  Stack,
  Text,
} from "@mantine/core";
import { useCallback, useMemo, useState } from "react";
import Collapse from "@/components/common/Collapse";
import useBranchStore from "@/stores/branch.store";
import useChainStore from "@/stores/chain.store";
import ErrorMessage from "@/components/common/ErrorMessage";
import ConfirmPopup from "@/components/common/ConfirmPopup";
import TextInput from "@/components/common/TextInput";
import PhoneInput from "@/components/common/PhoneInput";
import { Branch } from "@/types";
import {
  convertToInternationalFormat,
  isVietnamesePhoneNumber,
} from "@/utils";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import classes from "./Form.module.scss";
import Select from "@/components/common/Select";

const CreateBranchForm = () => {
  const t = useTranslation();
  const { addBranch } = useBranchStore();
  const { options: OPTION_CHAIN } = useChainStore();
  const [open, { close: close, open: openModalConfirm }] =
    useDisclosure(false);
  const [error, setError] = useState<string | undefined>("");

  const form = useForm<Branch>({
    initialValues: {
      id: "",
      name: "",
      shortName: "",
      address: "",
      phone: "",
      email: "",
      chainId: "",
    },
    // TODO: consider for better approach!
    transformValues: (values) => _transformValues(values),
  });

  const isValid = useMemo(() => {
    const values = form.values;
    const validationErrors = {
      name: !values.name ? t("Please enter name") : null,
      address: !values.address ? t("Please enter address") : null,
      phone: !isVietnamesePhoneNumber(
        convertToInternationalFormat(
          form.values.phone as string,
        ) as string,
      )
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
    async (value: Branch) => {
      setError(undefined);
      const _error = await addBranch(value);
      _error ? setError(_error) : form.reset();
    },
    [addBranch, form],
  );
  return (
    <Card
      withBorder
      shadow="md"
      w="100%"
      style={{ overflow: "visible" }}
    >
      <Collapse title={t("Create branch")}>
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
                  {t("Create")}
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
      </Collapse>
    </Card>
  );
};

export default CreateBranchForm;

function _transformValues(values: Branch) {
  return {
    id: values.id.toString().trim(),
    name: values.name?.toString().trim(),
    shortName: values.shortName?.toString().trim(),
    address: values.address?.toString().trim(),
    phone: values.phone?.toString().trim(),
    email: values.email?.toString().trim(),
    chainId: values.chainId?.toString().trim(),
  };
}
