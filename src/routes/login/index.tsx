import LoginForm from "@/components/Login/Form";
import { Anchor, Center, Container, Stack } from "@mantine/core";
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
    <Container h='100vh' size='' bg='var(--mantine-color-gray-light)'>
      <Container pt='5rem'>
        <Container size='xs' p={0} bg='white' style={{ borderRadius: "4px" }}>
          <Center>
            <Stack gap='1rem' p='2rem'>
              <Center fz='1.4rem'>Welcome Back !</Center>
              <div>Sign in to continue to C-Booking.</div>
            </Stack>
          </Center>
          <LoginForm />
        </Container>
        <Center mt='1rem'>
          Do not have an account ?&nbsp;
          <Anchor href='/register' underline='never'>
            Register now
          </Anchor>
        </Center>
      </Container>
    </Container>
  );
}
