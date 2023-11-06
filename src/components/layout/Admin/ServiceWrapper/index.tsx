import { AppShell } from "@mantine/core";
import AdminHeader from "../AdminHeader";

type Props = {
  children: React.ReactNode;
  title?: string;
};

const ServiceWrapper = ({ children, title }: Props) => {
  return (
    <AppShell
      fixed
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm" }}
      sx={{
        minHeight: "100vh",
      }}
    >
      <AppShell.Header withBorder={false}>
        <AdminHeader title={title} />
      </AppShell.Header>
      <AppShell.Navbar withBorder={false}>
        <></>
      </AppShell.Navbar>
      <AppShell.Main h={"100vh"}>{children}</AppShell.Main>
    </AppShell>
  );
};

export default ServiceWrapper;
