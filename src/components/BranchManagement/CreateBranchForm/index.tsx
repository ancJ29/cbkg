import Collapse from "@/components/common/Collapse";
import ConfirmPopup from "@/components/common/ConfirmPopup";
import ErrorMessage from "@/components/common/ErrorMessage";
import PhoneInput from "@/components/common/PhoneInput";
import Select from "@/components/common/Select";
import TextInput from "@/components/common/TextInput";
import useFormValid from "@/hooks/useFormValid";
import useTranslation from "@/hooks/useTranslation";
import useMetaDataStore from "@/stores/meta-data.store";
import { Branch } from "@/types";
import {
  convertToInternationalFormat,
  isVietnamesePhoneNumber,
} from "@/utils";
import {
  Box,
  Button,
  Card,
  Center,
  Stack,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useCallback, useState } from "react";
import classes from "./Form.module.scss";

const initialValues: Branch = {
  id: "",
  name: "",
  shortName: "",
  address: "",
  phone: "",
  email: "",
  chainId: "",
};

const CreateBranchForm = ({
  addBranch,
}: {
  addBranch: (branch: Branch) => Promise<string>;
}) => {
  const t = useTranslation();
  const { defaultChainId, chainOptions } = useMetaDataStore();
  const [open, { close: close, open: openModalConfirm }] =
    useDisclosure(false);
  const [error, setError] = useState<string | undefined>("");

  const form = useForm<Branch>({
    initialValues: {
      ...initialValues,
      chainId: defaultChainId,
    },
    // TODO: consider for better approach!
    transformValues,
  });

  const validator = useCallback(
    (values: Branch) => ({
      name: !values.name ? t("Please enter name") : null,
      address: !values.address ? t("Please enter address") : null,
      phone: !isVietnamesePhoneNumber(form.values.phone)
        ? t("Please enter phone")
        : null,
      email: !values.email ? t("Please enter email") : null,
      chainId: !values.chainId ? t("Please select chain") : null,
    }),
    [form.values, t],
  );

  const isValid = useFormValid<Branch>(form, validator);

  const onSubmit = useCallback(
    async (branch: Branch) => {
      setError(undefined);
      const _error = await addBranch(branch);
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
        <form onSubmit={form.onSubmit(openModalConfirm)}>
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
                placeholder={t("Phone Number")}
                value={form.values.phone}
                onChangeValue={(phone) =>
                  form.setFieldValue("phone", phone)
                }
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
                options={chainOptions}
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
            onSave={form.onSubmit(onSubmit)}
          />
        </form>
      </Collapse>
    </Card>
  );
};

export default CreateBranchForm;

function transformValues(values: Branch) {
  return {
    id: values.id.trim(),
    name: values.name?.toString().trim(),
    shortName: values.shortName?.toString().trim(),
    address: values.address?.toString().trim(),
    phone: convertToInternationalFormat(
      values.phone?.toString().trim(),
    ),
    email: values.email?.toString().trim(),
    chainId: values.chainId?.toString().trim(),
  };
}
