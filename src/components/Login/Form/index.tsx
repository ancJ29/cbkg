import callApi from "@/services/api";
import useAuthStore from "@/stores/auth.store";
import {
  Anchor,
  Box,
  Button,
  Center,
  Checkbox,
  Container,
  Group,
  PasswordInput,
  Stack,
  TextInput,
} from "@mantine/core";
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
      } else form.setErrors({ name: "Email or password is incorrect.", password: "Email or password is incorrect." });
    },
    [form, navigate, setToken],
  );
  return (
    <Container>
      <Stack gap='xs' p='2rem'>
        <Box py='1rem'>
          <form onSubmit={form.onSubmit((values) => onLogin && onLogin(values))}>
            <TextInput label='Email' placeholder={"Enter email"} {...form.getInputProps("name")} />
            <PasswordInput label='Password' placeholder='Enter password' {...form.getInputProps("password")} />
            <Group justify='flex-start' mt='xl'>
              <Checkbox defaultChecked label='Remember me' />
              <Button type='submit' w='100%'>
                Login
              </Button>
            </Group>
          </form>
        </Box>
        <Center w='100%' fz='0.8rem'>
          <Anchor href='/forgot-password' underline='never'>
            <Center>
              <IconLock size='1rem' />
              Forgot your password?
            </Center>
          </Anchor>
        </Center>
      </Stack>
    </Container>
  );
};

export default LoginForm;
