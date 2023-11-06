import TextInput from "@/components/common/TextInput";
import AuthLayout from "@/components/layout/Auth";
import { Anchor, Box, Button, Card, Center, Group, Text } from "@mantine/core";
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
    // eslint-disable-next-line no-console
    console.log(data);
  };
  return (
    <AuthLayout>
      <Box>
        <Text style={{ textAlign: "center" }}>Re-Password with C-Booking.</Text>
        <Card withBorder shadow='md' radius={10} p='2rem' mt='1rem'>
          <Center bg='teal.1' h='3rem' px='1rem' mb='xs' style={{ borderRadius: "4px" }} fz='sm'>
            Enter your Email and instructions will be sent to you!
          </Center>
          <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
            <TextInput label='Email' placeholder={"Enter email"} {...form.getInputProps("email")} />
            <Group justify='flex-end' mt='xs'>
              <Button type='submit'>Reset</Button>
            </Group>
          </form>
        </Card>
        <Center mt='1rem'>
          Remember It ?&nbsp;
          <Anchor href='/login' underline='never'>
            Sign In here
          </Anchor>
        </Center>
      </Box>
    </AuthLayout>
  );
};
export default ForgotPassword;
