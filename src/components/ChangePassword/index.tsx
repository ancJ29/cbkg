import PasswordInput from "@/components/common/PasswordInput";
import useFormValid from "@/hooks/useFormValid";
import useTranslation from "@/hooks/useTranslation";
import callApi from "@/services/api";
import useAuthStore from "@/stores/auth.store";
import { Button, Card, Stack, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useCallback } from "react";
import { z } from "zod";
import classes from "./ChangePassword.module.scss";

const schema = z.object({
  currentPassword: z.string(),
  newPassword: z.string(),
  reNewPassword: z.string(),
});

type AccountFormProps = z.infer<typeof schema>;

const ChangePassword = () => {
  const t = useTranslation();
  const { user } = useAuthStore();

  const form = useForm<AccountFormProps>({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      reNewPassword: "",
    },
  });

  const validator = useCallback(
    (values: AccountFormProps) => ({
      currentPassword:
        values.currentPassword.length < 1
          ? t("Please enter current password")
          : null,
      newPassword:
        values.newPassword.length < 1
          ? t("Please enter new password")
          : null,
      reNewPassword:
        values.reNewPassword !== values.newPassword
          ? t("Passwords did not match")
          : null,
    }),
    [t],
  );

  const isValid = useFormValid<AccountFormProps>(form, validator);

  const onSubmit = useCallback(
    async (value: AccountFormProps) => {
      const res = await callApi({
        action: "change-password",
        params: {
          id: user?.id,
          password: value.newPassword,
        },
        options: {
          toastMessage: t("Password changed successfully!"),
          showToastMessage: true,
        },
      });
      if (res) {
        form.reset();
      } else {
        form.setErrors({
          general: t("An error occurred while processing"),
        });
      }
    },
    [user?.id, t, form],
  );

  return (
    <Card w="100%" p={10}>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Stack gap={10}>
          <div className={classes.inputContainer}>
            <Text>{t("Current Password")}:</Text>
            <PasswordInput
              withAsterisk
              className={classes.input}
              placeholder={t("Current Password")}
              {...form.getInputProps("currentPassword")}
            />
          </div>
          <div className={classes.inputContainer}>
            <Text>{t("New Password")}:</Text>
            <PasswordInput
              withAsterisk
              className={classes.input}
              placeholder={t("New Password")}
              {...form.getInputProps("newPassword")}
            />
          </div>
          <div className={classes.inputContainer}>
            <Text>{t("Re New Password")}:</Text>
            <PasswordInput
              className={classes.input}
              withAsterisk
              placeholder={t("Re New Password")}
              {...form.getInputProps("reNewPassword")}
            />
          </div>
          <div className={classes.inputContainer}>
            <div></div>
            <Button
              type="submit"
              className={classes.btn}
              disabled={!isValid}
            >
              {t("Save")}
            </Button>
          </div>
        </Stack>
      </form>
    </Card>
  );
};

export default ChangePassword;
