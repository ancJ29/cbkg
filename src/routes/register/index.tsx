import PasswordInput from "@/components/common/PasswordInput";
import TextInput from "@/components/common/TextInput";
import AuthLayout from "@/components/layout/Auth";
import callApi from "@/services/api";
import { Center, Group, Button, Anchor, Card, Box, Text } from "@mantine/core";
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
    <AuthLayout>
      <Box>
        <Text style={{ textAlign: "center" }}>Get your free c-booking account now</Text>
        <Card withBorder shadow='md' radius={10} p='2rem' mt='1rem'>
          <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
            <TextInput label='Username' placeholder={"Enter Username"} {...form.getInputProps("username")} />
            <PasswordInput label='Password' placeholder={"Enter Password"} {...form.getInputProps("password")} />
            <Group justify='flex-start' mt='xl'>
              <Button w='100%' type='submit'>
                Register
              </Button>
            </Group>
          </form>
        </Card>

        <Center mt='2rem'>
          Already have an account ?&nbsp;
          <Anchor href='/login' underline='never'>
            Sign in
          </Anchor>
        </Center>
      </Box>
    </AuthLayout>
  );
};
export default Register;
