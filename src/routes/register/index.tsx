import callApi from "@/services/api";
import { Container, Center, Stack, TextInput, Group, Button, Anchor, PasswordInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const schema = z.object({
  username: z.string().min(1, { message: "Please enter Username" }),
  password: z.string().min(1, { message: "Please enter Password" }),
});
const resolver = zodResolver(schema);
type RegisterProf = z.infer<typeof schema>;
const Register = () => {
  const navigate = useNavigate();
  const form = useForm<RegisterProf>({
    initialValues: {
      username: "",
      password: "",
    },
    validate: resolver,
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
    <Container h='100vh' size='' bg='var(--mantine-color-gray-light)'>
      <Container pt='5rem'>
        <Container size='xs' p={0} bg='white' style={{ borderRadius: "4px" }}>
          <Center>
            <Stack gap='1rem' p='2rem'>
              <Center fz='1.4rem'>Free Register</Center>
              <div>Get your free c-booking account now</div>
            </Stack>
          </Center>
          <Stack p='2rem'>
            <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
              <TextInput label='Username' placeholder={"Enter Username"} {...form.getInputProps("username")} />
              <PasswordInput label='Password' placeholder={"Enter Password"} {...form.getInputProps("password")} />
              <Group justify='flex-start' mt='xl'>
                <Button w='100%' type='submit'>
                  Register
                </Button>
              </Group>
            </form>
          </Stack>
        </Container>
      </Container>
      <Center mt='2rem'>
        Already have an account ?&nbsp;
        <Anchor href='/login' underline='never'>
          Login
        </Anchor>
      </Center>
    </Container>
  );
};
export default Register;
