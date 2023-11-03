import LoginForm from "@/components/Login/Form";
import Layout from "@/components/layout";
import { Text, Container, Title, Stack, Center } from "@mantine/core";
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
    <Layout>
      <Center h='100%'>
        <Container p={0} style={{ borderRadius: "4px", width: "480px", paddingBottom: 16 }}>
          <Stack justify='' gap='1rem' py='2rem'>
            <Title align='center' fz={36} fw={900}>
              Welcome Back !
            </Title>
            <Text align='center'>Sign in to continue to C-Booking.</Text>
          </Stack>
          <LoginForm />
        </Container>
      </Center>
    </Layout>
  );
}
