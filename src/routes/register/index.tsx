import PasswordInput from "@/components/common/PasswordInput";
import TextCenter from "@/components/common/TextCenter";
import TextInput from "@/components/common/TextInput";
import AuthLayout from "@/components/layout/Auth";
import useTranslation from "@/hooks/useTranslation";
import callApi from "@/services/api";
import {
  Anchor,
  Box,
  Button,
  Card,
  Center,
  Group,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const Register = () => {
  const t = useTranslation();
  const navigate = useNavigate();
  const form = useForm<RegisterProf>({
    initialValues: {
      username: "",
      password: "",
    },
    validate: {
      username: (value) =>
        value.length < 1 ? t("Please enter Username") : null,
      password: (value) =>
        value.length < 1 ? t("Please enter Password") : null,
    },
  });
  const onSubmit = useCallback(
    async (value: RegisterProf) => {
      try {
        await callApi({
          params: value,
          action: "register",
        });
        navigate("/login");
      } catch (error) {
        form.setErrors({
          name: "Email or password is incorrect.",
          password: "Email or password is incorrect.",
        });
      }
    },
    [form, navigate],
  );

  return (
    <AuthLayout>
      <Box>
        <TextCenter>
          {t("Get your free c-booking account now")}
        </TextCenter>
        <Card withBorder shadow="md" radius={10} p="2rem" mt="1rem">
          <form
            onSubmit={form.onSubmit((values) => onSubmit(values))}
          >
            <TextInput
              label={t("Username")}
              placeholder={t("Enter Username")}
              {...form.getInputProps("username")}
            />
            <PasswordInput
              label={t("Password")}
              placeholder={t("Enter Password")}
              {...form.getInputProps("password")}
            />
            <Group justify="flex-start" mt="xl">
              <Button w="100%" type="submit">
                {t("Register")}
              </Button>
            </Group>
          </form>
        </Card>

        <Center mt="2rem">
          {t("Already have an account")} ?&nbsp;
          <Anchor href="/login" underline="never">
            {t("Sign in")}
          </Anchor>
        </Center>
      </Box>
    </AuthLayout>
  );
};
export default Register;

const schema = z.object({
  username: z.string(),
  password: z.string(),
});
type RegisterProf = z.infer<typeof schema>;
