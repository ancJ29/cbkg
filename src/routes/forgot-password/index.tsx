import TextCenter from "@/components/common/TextCenter";
import TextInput from "@/components/common/TextInput";
import AuthLayout from "@/components/layout/Auth";
import useTranslation from "@/hooks/useTranslation";
import logger from "@/services/logger";
import {
  Anchor,
  Box,
  Button,
  Card,
  Center,
  Group,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { z } from "zod";

const ForgotPassword = () => {
  const t = useTranslation();

  const form = useForm<ForgotPasswordProp>({
    initialValues: {
      email: "",
    },
    validate: {
      email: (value) =>
        value.length < 1 ? t("Please enter Email") : null,
    },
  });
  const onSubmit = (data: ForgotPasswordProp) => {
    // TODO: forgot password
    logger.debug(data);
  };

  return (
    <AuthLayout>
      <Box>
        <TextCenter>Re-Password with C-Booking.</TextCenter>
        <Card withBorder shadow="md" radius={10} p="2rem" mt="1rem">
          <Center
            bg="teal.1"
            h="3rem"
            px="1rem"
            mb="xs"
            style={{ borderRadius: "4px" }}
            fz="sm"
          >
            {t(
              "Enter your Email and instructions will be sent to you",
            )}
            !
          </Center>
          <form onSubmit={form.onSubmit(onSubmit)}>
            <TextInput
              label={t("Email")}
              placeholder={t("Enter Email")}
              {...form.getInputProps("email")}
            />
            <Group justify="flex-end" mt="xs">
              <Button type="submit">{t("Reset")}</Button>
            </Group>
          </form>
        </Card>
        <Center mt="1rem">
          {t("Remember It")} ?&nbsp;
          <Anchor href="/login" underline="never">
            {t("Sign In here")}
          </Anchor>
        </Center>
      </Box>
    </AuthLayout>
  );
};

export default ForgotPassword;

const schema = z.object({
  email: z.string().min(1, { message: "Please enter Email" }),
});
type ForgotPasswordProp = z.infer<typeof schema>;
