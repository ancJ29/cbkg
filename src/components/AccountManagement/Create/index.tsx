import useTranslation from "@/hooks/useTranslation";
import { Card, LoadingOverlay } from "@mantine/core";
import { useCallback, useState } from "react";
import AccountForm from "../Form";
import { UserRequest } from "@/types";
import Collapse from "@/components/common/Collapse";
import useUserStore from "@/stores/user.store";

const CreateAccount = () => {
  const t = useTranslation();
  const { addUser } = useUserStore();
  const [user] = useState();
  const [loaded, setLoaded] = useState(false);

  const onSubmit = useCallback(
    (value: UserRequest) => {
      setLoaded(true);
      addUser(value);
      setLoaded(false);
    },
    [addUser],
  );

  return (
    <Card
      withBorder
      shadow="md"
      w="100%"
      style={{ overflow: "visible" }}
    >
      <Collapse title={t("Create account")}>
        <LoadingOverlay
          visible={loaded}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
        <AccountForm onSave={onSubmit} user={user} action="Create" />
      </Collapse>
    </Card>
  );
};

export default CreateAccount;
