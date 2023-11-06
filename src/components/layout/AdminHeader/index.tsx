import useAuthStore from "@/stores/auth.store";
import { Box, Card, Flex, Title } from "@mantine/core";
import { IconLogout, IconMenu2, IconSettings } from "@tabler/icons-react";

const AdminHeader = ({ title }: { title?: string }) => {
  const { removeToken } = useAuthStore();

  return (
    <Card>
      <Flex display='flex' align='stretch' justify='space-between'>
        <Box display='flex'>
          <IconMenu2 />
          <Title pl='2rem' size='1.2rem'>
            {title || "C-booking Admin"}
          </Title>
        </Box>
        <Flex gap='0.2rem'>
          <IconSettings color='gray' />
          <IconLogout color='gray' onClick={removeToken} />
        </Flex>
      </Flex>
    </Card>
  );
};
export default AdminHeader;
