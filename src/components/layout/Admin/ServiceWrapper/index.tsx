import { AppShell, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { isMobile } from "react-device-detect";
import AdminHeader from "../AdminHeader";
import Navbar from "../Navbar";

type Props = {
  children: React.ReactNode;
  title?: string;
};

const ServiceWrapper = ({ children, title }: Props) => {
  const [open, { toggle: toggle }] = useDisclosure(isMobile ? false : true);
  const width = open ? 300 : 60;

  return (
    <AppShell
      header={{ height: 68 }}
      navbar={{
        width: width,
        breakpoint: "sm",
        collapsed: { mobile: !open, desktop: false },
      }}
      mih='100vh'
    >
      <AppShell.Header withBorder={false}>
        <AdminHeader title={title} burger={<Burger opened={open} onClick={toggle} size='sm' />} />
      </AppShell.Header>
      <AppShell.Navbar withBorder>{<Navbar display={!open} onClick={() => isMobile && toggle()} />}</AppShell.Navbar>
      <AppShell.Main bg='linear-gradient(to top, rgb(223, 233, 243) 0%, white 100%)' h={"100vh"}>
        {children}
      </AppShell.Main>
    </AppShell>
  );
};

export default ServiceWrapper;
