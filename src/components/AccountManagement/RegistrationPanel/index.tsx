import Collapse from "@/components/common/Collapse";
import useTranslation from "@/hooks/useTranslation";
import useUserStore from "@/stores/user.store";
import { Card } from "@mantine/core";
import CreateAccountForm from "../CreateAccountForm";

const RegistrationPanel = () => {
  const t = useTranslation();
  const { addUser } = useUserStore();

  return (
    <Card
      withBorder
      shadow="md"
      w="100%"
      style={{ overflow: "visible" }}
    >
      <Collapse title={t("Create account")}>
        <CreateAccountForm onSave={addUser} />
      </Collapse>
    </Card>
  );
};

export default RegistrationPanel;
