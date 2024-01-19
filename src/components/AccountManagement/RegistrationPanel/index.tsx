import Collapse from "@/components/common/Collapse";
import useTranslation from "@/hooks/useTranslation";
import { User as Account } from "@/types";
import { Card } from "@mantine/core";
import CreateAccountForm from "../CreateAccountForm";

type RegistrationPanelProps = {
  addAccount: (account: Account) => Promise<string>;
};

const RegistrationPanel = ({
  addAccount,
}: RegistrationPanelProps) => {
  const t = useTranslation();

  return (
    <Card
      withBorder
      shadow="md"
      w="100%"
      style={{ overflow: "visible" }}
    >
      <Collapse title={t("Create account")}>
        <CreateAccountForm onSave={addAccount} />
      </Collapse>
    </Card>
  );
};

export default RegistrationPanel;
