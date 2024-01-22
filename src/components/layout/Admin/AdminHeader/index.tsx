import DivButton from "@/components/common/DivButton";
import useTranslation from "@/hooks/useTranslation";
import useAuthStore from "@/stores/auth.store";
import {
  Card,
  Center,
  Drawer,
  Flex,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import LanguageSelector from "../LanguageSelector";
import Logo from "../Logo";
import Setting from "../Setting";

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
          <DivButton
            onClick={open}
            className="text-main"
            style={{ display: "flex" }}
          >
            <Text fw={700}>{user?.fullName || ""}</Text>
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
