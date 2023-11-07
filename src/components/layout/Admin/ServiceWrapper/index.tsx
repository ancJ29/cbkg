import { AppShell, Box, Burger } from "@mantine/core";
import AdminHeader from "../AdminHeader";
import { useDisclosure } from "@mantine/hooks";

type Props = {
  children: React.ReactNode;
  title?: string;
};

const ServiceWrapper = ({ children, title }: Props) => {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      sx={{
        minHeight: "100vh",
      }}
    >
      <AppShell.Header withBorder={false}>
        <AdminHeader
          title={title}
          burger={
            <Box>
              <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom='sm' size='sm' />
              <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom='sm' size='sm' />
            </Box>
          }
        />
      </AppShell.Header>
      <AppShell.Navbar withBorder>
        <></>
      </AppShell.Navbar>
      <AppShell.Main bg='linear-gradient(to top, rgb(223, 233, 243) 0%, white 100%)' h={"100vh"}>
        {children}
      </AppShell.Main>
    </AppShell>
  );
};

export default ServiceWrapper;
