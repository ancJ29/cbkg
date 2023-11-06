import LoginForm from "@/components/Login/Form";
import { Box, Center,  Stack, Text, Title } from "@mantine/core";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    }
  });

  return (
    <Box h='100vh' px={10}>
      <Center h='100%'>
        <Stack gap='1rem' p={0} style={{ width: "480px" }}>
          <Stack gap='1rem' align="Center">
            <Title fz='2.6rem' fw={900}>
              C-booking Admin
            </Title>
            <Text>Sign in to continue to C-Booking.</Text>
          </Stack>
          <LoginForm />
        </Stack>
      </Center>
    </Box>
  );
}
