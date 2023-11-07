import PasswordInput from "@/components/common/PasswordInput";
import TextInput from "@/components/common/TextInput";
import useTranslation from "@/hooks/useTranslation";
import callApi from "@/services/api";
import useAuthStore from "@/stores/auth.store";
import { Anchor, Button, Card, Center, Checkbox, Flex, Group, Stack, Text } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { IconLock } from "@tabler/icons-react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const schema = z.object({
  password: z.string().min(1, { message: "Please enter password" }),
  name: z.string().min(1, { message: "Please enter Email" }),
});
const resolver = zodResolver(schema);
type LoginProps = z.infer<typeof schema>;

const LoginForm = () => {
  const t = useTranslation();

  const form = useForm<LoginProps>({
    initialValues: {
      name: "",
      password: "",
    },
    validate: resolver,
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
        setToken(data.token);
        navigate("/dashboard");
      } else {
        form.setErrors({
          name: t("Email or password is incorrect."),
          password: t("Email or password is incorrect."),
        });
      }
    },
    [form, navigate, setToken, t],
  );
  return (
    <Card withBorder shadow='md' radius={10} mt='1rem'>
      <Stack gap='xs' p='.5rem'>
        <form onSubmit={form.onSubmit(onLogin)}>
          <TextInput
            withAsterisk
            pb='.8rem'
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
          <Group justify='flex-start' mt='xl'>
            <Flex w='100%' fz='0.8rem' justify='space-between'>
              <Checkbox defaultChecked label='Remember me' />
              <Anchor href='/forgot-password' underline='never'>
                <Center>
                  <IconLock size='1rem' />
                  <Text>{t("Forgot your password")}?</Text>
                </Center>
              </Anchor>
            </Flex>
            <Button type='submit' w='100%'>
              {t("Sign in")}
            </Button>
          </Group>
        </form>
      </Stack>
    </Card>
  );
};

export default LoginForm;
