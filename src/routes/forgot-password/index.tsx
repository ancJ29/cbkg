import { Anchor, Button, Center, Container, Group, Stack, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";

const schema = z.object({
  email: z.string().min(1, { message: "Please enter Email" }),
});
const resolver = zodResolver(schema);
type ForgotPasswordProf = z.infer<typeof schema>;
const ForgotPassword = () => {
  const form = useForm<ForgotPasswordProf>({
    initialValues: {
      email: "",
    },
    validate: resolver,
  });
  const onSubmit = (data: ForgotPasswordProf) => {
    // TODO: forgot password
    console.log(data);
  };
  return (
    <Container h='100vh' size='' bg='var(--mantine-color-gray-light)'>
      <Container pt='5rem'>
        <Container size='xs' p={0} bg='white' style={{ borderRadius: "4px" }}>
          <Center>
            <Stack gap='1rem' p='2rem'>
              <Center fz='1.4rem'>Reset Password</Center>
              <div>Re-Password with C-Booking.</div>
            </Stack>
          </Center>
          <Stack p='2rem'>
            <Center bg='teal.1' h='3rem' style={{ borderRadius: "4px" }}>
              Enter your Email and instructions will be sent to you!
            </Center>
            <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
              <TextInput label='Email' placeholder={"Enter email"} {...form.getInputProps("email")} />
              <Group justify='flex-end' mt='xl'>
                <Button type='submit'>Reset</Button>
              </Group>
            </form>
          </Stack>
        </Container>
        <Center mt='2rem'>
          Remember It ?&nbsp;
          <Anchor href='/login' underline='never'>
            Sign In here
          </Anchor>
        </Center>
      </Container>
    </Container>
  );
};
export default ForgotPassword;
