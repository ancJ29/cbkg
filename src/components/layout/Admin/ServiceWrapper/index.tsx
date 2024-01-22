import { AppShell, Box, Burger, Button } from "@mantine/core";
import { useDisclosure, useWindowScroll } from "@mantine/hooks";
import { BrowserView, isMobile } from "react-device-detect";
import AdminHeader from "../AdminHeader";
import Navbar from "../Navbar";
import { IconArrowUp } from "@tabler/icons-react";

type Props = {
  children: React.ReactNode;
  title?: string;
};

const ServiceWrapper = ({ children }: Props) => {
  const [open, { toggle }] = useDisclosure(isMobile ? false : true);
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <AppShell
      mih="100vh"
      header={{ height: "4.5rem" }}
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
            onShowFullNavbar={() => !open && toggle()}
          />
        }
      </AppShell.Navbar>
      <AppShell.Main>
        <Box
          style={{
            flex: "grow",
            height: "auto",
            width: "100%",
          }}
        >
          {children}
        </Box>
      </AppShell.Main>{" "}
      <BrowserView>
        {scroll.y >= 10 && (
          <Button
            variant="outline"
            radius={999}
            p={0}
            w={40}
            h={40}
            pos="fixed"
            bottom="3rem"
            left={"50%"}
            onClick={() => scrollTo({ y: 0 })}
            bg="#ced4da"
          >
            <IconArrowUp />
          </Button>
        )}
      </BrowserView>
    </AppShell>
  );
};

export default ServiceWrapper;
