import useAuthStore from "@/stores/auth.store";
import { Box, Card, Drawer, Flex, Stack, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconLogout, IconSettings } from "@tabler/icons-react";
import LanguageSelector from "../LanguageSelector";

const AdminHeader = ({ title, burger }: { title?: string; burger?: React.ReactNode }) => {
  const { removeToken } = useAuthStore();
  const [opened, { close, open }] = useDisclosure(false);

  return (
    <Card>
      <Flex display='flex' align='stretch' justify='space-between'>
        <Box display='flex'>
          {burger || ""}
          <Title pl='2rem' size='1.2rem'>
            {title || "C-booking Admin"}
          </Title>
        </Box>
        <Flex gap='0.2rem' align='center'>
          <IconSettings size='1.25rem' onClick={open} />
        </Flex>
      </Flex>
      <Drawer opened={opened} onClose={close} title='Settings' position='right' transitionProps={{ duration: 0 }}>
        <Stack>
          <Flex justify='end'>
            <IconLogout size='1.25rem' onClick={removeToken} />
          </Flex>
          <LanguageSelector />
        </Stack>
      </Drawer>
    </Card>
  );
};
export default AdminHeader;
