import { Center, Container, Title } from "@mantine/core";

const AuthLayout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <Center
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to top, rgb(223, 233, 243) 0%, white 100%)",
      }}
    >
      <Container size='xs' style={{ width: 480, paddingBottom: 16 }}>
        <Title
          align='center'
          sx={{
            fontSize: 42,
            fontWeight: 900,
          }}
        >
          C-Booking Admin
        </Title>

        {children}
      </Container>
    </Center>
  );
};
export default AuthLayout;
