import useTranslation from "@/hooks/useTranslation";
import { Box, Button, Card, Stack, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useCallback, useMemo } from "react";
import { z } from "zod";
import classes from "./ChangePassword.module.scss";
import callApi from "@/services/api";
import useAuthStore from "@/stores/auth.store";
import { useDisclosure } from "@mantine/hooks";
import PasswordInput from "@/components/common/PasswordInput";
import { STATUS_CODE } from "@/types";

const ChangePassword = () => {
  const t = useTranslation();
  const { user } = useAuthStore();
  const [opened, { open }] = useDisclosure(false);

  const form = useForm<AccountFormProps>({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      reNewPassword: "",
    },
  });
  const onSubmit = useCallback(
    async (value: AccountFormProps) => {
      const res = await callApi({
        params: {
          id: user?.id,
          password: value.newPassword,
        },
        action: "change-password",
      });
      if (res.status < STATUS_CODE.ERROR) {
        open();
        form.reset();
      } else {
        form.setErrors({
          general: t(
            res.error || "An error occurred while processing",
          ),
        });
      }
    },
    [user?.id, form, open, t],
  );

  const isValid = useMemo(() => {
    const values = form.values;

    const validationErrors = {
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
    };

    const hasErrors = Object.values(validationErrors).some(
      (error) => error !== null,
    );

    return !hasErrors;
  }, [form, t]);

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
          {opened && (
            <div className={classes.inputContainer}>
              <div>&nbsp;</div>
              <Box
                p={10}
                display="flex"
                bg="#A8F1C0"
                style={{
                  justifyContent: "center",
                  borderRadius: "4px",
                }}
                className={classes.input}
              >
                {t("Password changed successfully!")}
              </Box>
            </div>
          )}
        </Stack>
      </form>
    </Card>
  );
};
export default ChangePassword;
const schema = z.object({
  currentPassword: z.string(),
  newPassword: z.string(),
  reNewPassword: z.string(),
});
type AccountFormProps = z.infer<typeof schema>;
