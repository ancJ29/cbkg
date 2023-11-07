import { Center, Container, Title } from "@mantine/core";

const AuthLayout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <Center
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to top, rgb(223, 233, 243) 0%, white 100%)",
      }}
    >
      <Container w={480} size='xs' pb={16}>
        <Center>
          <Title fz={42} fw={900}>
            C-Booking Admin
          </Title>
        </Center>
        {children}
      </Container>
    </Center>
  );
};
export default AuthLayout;
