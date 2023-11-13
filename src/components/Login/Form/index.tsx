import PasswordInput from "@/components/common/PasswordInput";
import TextCenter from "@/components/common/TextCenter";
import TextInput from "@/components/common/TextInput";
import useTranslation from "@/hooks/useTranslation";
import callApi from "@/services/api";
import useAuthStore from "@/stores/auth.store";
import {
  Anchor,
  Button,
  Card,
  Checkbox,
  Flex,
  Group,
  Stack,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const LoginForm = () => {
  const t = useTranslation();

  const form = useForm<LoginProps>({
    initialValues: {
      name: "",
      password: "",
      remember: false,
    },
    validate: {
      name: (value) =>
        value.length < 1 ? t("Please enter Email") : null,
      password: (value) =>
        value.length < 1 ? t("Please enter Password") : null,
    },
  });
  const navigate = useNavigate();
  const { setToken } = useAuthStore();

  const onLogin = useCallback(
    async (value: LoginProps) => {
      const data = await callApi({
        params: value,
        action: "login",
      });
      if (data) {
        setToken(data.token, value.remember);
        navigate("/dashboard");
      } else {
        form.setErrors({
          password: t("Email or password is incorrect."),
        });
      }
    },
    [form, navigate, setToken, t],
  );
  return (
    <Card withBorder shadow="md" radius={10} mt="1rem">
      <Stack gap="xs" p=".5rem" pt={0}>
        <form onSubmit={form.onSubmit(onLogin)}>
          <TextInput
            withAsterisk
            pb=".8rem"
            label={t("Email")}
            placeholder={t("Enter Email")}
            {...form.getInputProps("name")}
          />
          <PasswordInput
            withAsterisk
            label={t("Password")}
            placeholder={t("Enter Password")}
            {...form.getInputProps("password")}
          />
          <Group justify="flex-start" mt="xl">
            <Flex w="100%" fz="0.8rem" justify="space-between">
              <Checkbox
                {...form.getInputProps("remember")}
                label={t("Remember me")}
              />
              <Anchor href="/forgot-password" underline="never">
                <TextCenter>{t("Forgot your password")}?</TextCenter>
              </Anchor>
            </Flex>
            <Button type="submit" w="100%">
              {t("Sign in")}
            </Button>
          </Group>
        </form>
      </Stack>
    </Card>
  );
};

export default LoginForm;

const schema = z.object({
  password: z.string(),
  name: z.string(),
  remember: z.boolean(),
});
type LoginProps = z.infer<typeof schema>;
