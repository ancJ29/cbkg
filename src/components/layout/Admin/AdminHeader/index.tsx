import {
  Card,
  Center,
  Flex,
  Title,
  Drawer,
  Text,
} from "@mantine/core";
import LanguageSelector from "../LanguageSelector";
import Logo from "../Logo";
import { useDisclosure } from "@mantine/hooks";
import useTranslation from "@/hooks/useTranslation";
import Setting from "../Setting";
import useAuthStore from "@/stores/auth.store";
import DivButton from "@/components/common/DivButton";

const AdminHeader = ({ burger }: { burger: React.ReactNode }) => {
  const t = useTranslation();
  const { user } = useAuthStore();

  const [opened, { close, open }] = useDisclosure(false);

  return (
    <Card h="4.5rem">
      <Flex display="flex" align="stretch" justify={"space-between"}>
        <Center>
          {burger}
          <Title pl="xs" size="1.2rem">
            <Logo />
          </Title>
        </Center>
        <Flex align="center">
          <DivButton onClick={open} className="text-main">
            <Text fw={700}>{user?.name || ""}</Text>
          </DivButton>
          <LanguageSelector />
        </Flex>
        <Drawer
          opened={opened}
          onClose={close}
          title={t("Settings")}
          position="right"
          transitionProps={{ duration: 0 }}
          classNames={{ title: "font-bold" }}
        >
          <Setting />
        </Drawer>
      </Flex>
    </Card>
  );
};
export default AdminHeader;
