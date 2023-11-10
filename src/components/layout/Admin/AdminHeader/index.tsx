import useAuthStore from "@/stores/auth.store";
import { Card, Center, Drawer, Flex, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconLogout, IconSettings } from "@tabler/icons-react";
import LanguageSelector from "../LanguageSelector";
import { Logo } from "../Logo";

const AdminHeader = ({ title, burger }: { title?: string; burger?: React.ReactNode }) => {
  const { removeToken } = useAuthStore();
  const [opened, { close, open }] = useDisclosure(false);

  return (
    <Card>
      <Flex gap={20} display='flex' align='stretch' justify={"space-between"}>
        <Center>
          {burger || ""}
          <Title pl='xs' size='1.2rem'>
            {title || <Logo />}
          </Title>
        </Center>
        <Flex gap={10}>
          <LanguageSelector />
          <Flex gap='0.2rem' align='center'>
            <IconSettings size='1.25rem' onClick={open} />
          </Flex>
        </Flex>
      </Flex>
      <Drawer opened={opened} onClose={close} title='Settings' position='right' transitionProps={{ duration: 0 }}>
        <Flex direction='column' gap={10}>
          <Flex justify='end'>
            <IconLogout size='1.25rem' onClick={removeToken} />
          </Flex>
        </Flex>
      </Drawer>
    </Card>
  );
};
export default AdminHeader;
