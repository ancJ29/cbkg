import { AppShell, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { isMobile } from "react-device-detect";
import AdminHeader from "../AdminHeader";
import Navbar from "../Navbar";

type Props = {
  children: React.ReactNode;
  title?: string;
};

const ServiceWrapper = ({ children }: Props) => {
  const [open, { toggle }] = useDisclosure(isMobile ? false : true);

  return (
    <AppShell
      mih="100vh"
      header={{ height: 70 }}
      navbar={{
        width: open ? 300 : 60,
        breakpoint: "sm",
        collapsed: {
          mobile: !open,
          desktop: false,
        },
      }}
    >
      <AppShell.Header withBorder={false}>
        <AdminHeader
          burger={<Burger opened={open} onClick={toggle} size="sm" />}
        />
      </AppShell.Header>
      <AppShell.Navbar>
        {
          <Navbar
            display={!open}
            onClick={() => isMobile && toggle()}
          />
        }
      </AppShell.Navbar>
      <AppShell.Main style={{ display: "flex" }}>
        <div
          style={{
            width: "100%",
            flex: "grow",
            overflow: "scroll",
          }}
        >
          {children}
        </div>
      </AppShell.Main>
    </AppShell>
  );
};

export default ServiceWrapper;
