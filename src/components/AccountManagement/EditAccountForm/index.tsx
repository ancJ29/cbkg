import ConfirmPopup from "@/components/common/ConfirmPopup";
import ErrorMessage from "@/components/common/ErrorMessage";
import TextInput from "@/components/common/TextInput";
import useTranslation from "@/hooks/useTranslation";
import useWatchProp from "@/hooks/useWatchProp";
import { User as Account } from "@/types";
import { Button, Center, Flex, Stack, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useCallback, useState } from "react";
import classes from "./EditForm.module.scss";

type EditAccountFormProps = {
  account: Account;
  onSave: (value: Account) => Promise<string | undefined>;
  onFinish?: () => void;
};

const EditAccountForm = ({
  account,
  onSave,
  onFinish,
}: EditAccountFormProps) => {
  const t = useTranslation();
  const [error, setError] = useState<string | undefined>();
  const [open, { close: close, open: openModalConfirm }] =
    useDisclosure(false);
  const form = useForm<Account>({
    initialValues: account,
    // TODO: consider for better approach!
    transformValues,
    validate: {
      userName: (value: string) =>
        value.length < 1 ? t("Please enter Username") : null,
    },
  });

  useWatchProp(error, () => {
    !error && form.reset();
  });

  const confirm = useCallback(() => {
    form.validate();
    if (form.isValid()) {
      openModalConfirm();
    }
  }, [form, openModalConfirm]);

  const submit = useCallback(async () => {
    // staff-1
    if (onSave) {
      setError(undefined);
      const error = await onSave(form.values);
      if (error) {
        error && setError(error);
        // TODO: toast error
      } else {
        form.reset();
        onFinish && onFinish();
        // TODO: toast success
      }
    }
  }, [form, onFinish, onSave]);

  return (
    <>
      <form onSubmit={form.onSubmit(openModalConfirm)}>
        <Stack gap={20} px={10} my={20}>
          <div className={classes.inputContainer}>
            <Text>{t("Username")}:</Text>
            <TextInput
              className={classes.input}
              withAsterisk
              placeholder={t("Username")}
              {...form.getInputProps("userName")}
            />
          </div>
          <div className={classes.inputContainer}>
            <Text>{t("FullName")}:</Text>
            <TextInput
              className={classes.input}
              withAsterisk
              placeholder={t("FullName")}
              {...form.getInputProps("fullName")}
            />
          </div>
        </Stack>
        <Flex
          gap={12}
          w="100%"
          pb={12}
          pt={28}
          justify="center"
          direction="column"
        >
          <Center>
            <Button
              type="submit"
              className={classes.btn}
              onClick={confirm}
            >
              {t("Edit User")}
            </Button>
          </Center>
          <ErrorMessage message={error} />
        </Flex>
        <ConfirmPopup
          title={t("Confirm")}
          description={t(
            // TODO: translate this (vi.json)
            "Are you sure you want to update this account?",
          )}
          open={open}
          onClose={close}
          onSave={submit}
        />
      </form>
    </>
  );
};

export default EditAccountForm;

function transformValues(values: Account) {
  return {
    ...values,
    userName: values.userName.toString().trim(),
    fullName: values.fullName?.toString().trim(),
  };
}
