import useAuthStore from "@/stores/auth.store";
import { Card, Center, Flex, Title } from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";
import LanguageSelector from "../LanguageSelector";
import Logo from "../Logo";

const AdminHeader = ({ title, burger }: { title?: string; burger?: React.ReactNode }) => {
  const { removeToken } = useAuthStore();

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
            <IconLogout size='1.25rem' onClick={removeToken} />
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
};
export default AdminHeader;
