import PasswordInput from "@/components/common/PasswordInput";
import TextInput from "@/components/common/TextInput";
import callApi from "@/services/api";
import useAuthStore from "@/stores/auth.store";
import { Anchor, Button, Card, Center, Checkbox, Flex, Group, Stack } from "@mantine/core";
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
        form.setErrors({ name: "Email or password is incorrect.", password: "Email or password is incorrect." });
      }
    },
    [form, navigate, setToken],
  );
  return (
    <Card withBorder shadow='md' radius={10}>
      <Stack gap='xs' p='.5rem'>
        <form onSubmit={form.onSubmit((values) => onLogin && onLogin(values))}>
          <TextInput
            withAsterisk
            pb='.8rem'
            label='Email'
            placeholder={"Enter email"}
            {...form.getInputProps("name")}
          />
          <PasswordInput
            withAsterisk
            label='Password'
            placeholder='Enter password'
            {...form.getInputProps("password")}
          />
          <Group justify='flex-start' mt='xl'>
            <Flex w='100%' fz='0.8rem' justify='space-between'>
              <Checkbox defaultChecked label='Remember me' />
              <Anchor href='/forgot-password' underline='never'>
                <Center>
                  <IconLock size='1rem' />
                  Forgot your password?
                </Center>
              </Anchor>
            </Flex>
            <Button type='submit' w='100%'>
              Sign In
            </Button>
          </Group>
        </form>
      </Stack>
    </Card>
  );
};

export default LoginForm;
