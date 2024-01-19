import ChangePassword from "@/components/ChangePassword";
import { Box, Flex, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconLogout,
  IconPasswordUser,
  IconUser,
} from "@tabler/icons-react";
import classes from "./Setting.module.scss";
import useTranslation from "@/hooks/useTranslation";
import useAuthStore from "@/stores/auth.store";

const Setting = () => {
  const t = useTranslation();
  const { removeToken } = useAuthStore();
  const [openedModal, { close: closeModal, open: openModal }] =
    useDisclosure(false);

  return (
    <>
      <Flex direction="column" gap={10}>
        <Box className={classes.item}>
          <IconUser />
          <Text>{t("Your profile")}</Text>
        </Box>
        <Box className={classes.item} onClick={openModal}>
          <IconPasswordUser />
          <Text>{t("Change Password")}</Text>
        </Box>
        <Box className={classes.item} onClick={removeToken}>
          <IconLogout />
          <Text>{t("Logout")}</Text>
        </Box>
      </Flex>
      <Modal
        opened={openedModal}
        onClose={closeModal}
        title={t("Change Password")}
        centered
        size="lg"
      >
        <ChangePassword />
      </Modal>
    </>
  );
};
export default Setting;
