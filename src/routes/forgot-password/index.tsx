import TextInput from "@/components/common/TextInput";
import { Anchor, Box, Button, Card, Center, Container, Group, Stack, Text, Title } from "@mantine/core";
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
    <Box h='100vh'  px={10}>
      <Center h='100%'>
        <Container>
          <Center>
            <Stack gap='1rem' p='2rem'>
              <Center>
                <Title fz='2.6rem' fw={900}>
                  C-booking Admin
                </Title>
              </Center>
              <Center>
                <Text>Re-Password with C-Booking.</Text>
              </Center>
            </Stack>
          </Center>
          <Card withBorder shadow='md' radius={10} p='2rem'>
            <Center bg='teal.1' h='3rem' px='1rem' style={{ borderRadius: "4px" }}>
              Enter your Email and instructions will be sent to you!
            </Center>
            <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
              <TextInput label='Email' placeholder={"Enter email"} {...form.getInputProps("email")} />
              <Group justify='flex-end' mt='xl'>
                <Button type='submit'>Reset</Button>
              </Group>
            </form>
          </Card>
          <Center mt='2rem'>
            Remember It ?&nbsp;
            <Anchor href='/login' underline='never'>
              Sign In here
            </Anchor>
          </Center>
        </Container>
      </Center>
    </Box>
  );
};
export default ForgotPassword;
