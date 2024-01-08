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
import { isNotEmpty, useForm } from "@mantine/form";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const schema = z.object({
  password: z.string(),
  userName: z.string(),
  remember: z.boolean().optional(),
});

type LoginProps = z.infer<typeof schema>;

const LoginForm = () => {
  const t = useTranslation();
  const navigate = useNavigate();
  const { setToken } = useAuthStore();

  const form = useForm<LoginProps>({
    initialValues: {
      userName: "",
      password: "",
      remember: false,
    },
    validate: {
      userName: isNotEmpty(t("Please enter Email")),
      password: isNotEmpty(t("Please enter Password")),
    },
    // TODO: consider for better approach!
    transformValues,
  });

  const login = useCallback(
    async (value: LoginProps) => {
      const res = await callApi<unknown, { token: string }>({
        params: value,
        action: "login",
      });
      if (res?.token) {
        setToken(res.token, form.values.remember);
        navigate("/dashboard");
      } else {
        form.setErrors({
          password: t("Username or password is incorrect."),
        });
      }
    },
    [form, navigate, setToken, t],
  );

  return (
    <Card withBorder shadow="md" radius={10} mt="1rem">
      <Stack gap="xs" p=".5rem" pt={0}>
        <form onSubmit={form.onSubmit(login)}>
          <TextInput
            withAsterisk
            pb=".8rem"
            label={t("Username")}
            placeholder={t("Enter Username")}
            {...form.getInputProps("userName")}
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

function transformValues(values: LoginProps) {
  return {
    userName: values.userName.toString().trim(),
    password: values.password.toString().trim(),
  };
}
