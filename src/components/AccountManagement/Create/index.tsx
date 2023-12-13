import Collapse from "@/components/common/Collapse";
import useTranslation from "@/hooks/useTranslation";
import useUserStore from "@/stores/user.store";
import { Card } from "@mantine/core";
import AccountForm from "../Form";

const CreateAccount = () => {
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
        <AccountForm onSave={addUser} action="Create" />
      </Collapse>
    </Card>
  );
};

export default CreateAccount;
