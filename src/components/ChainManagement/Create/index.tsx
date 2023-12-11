import useTranslation from "@/hooks/useTranslation";
import { Card, LoadingOverlay } from "@mantine/core";
import { useCallback, useState } from "react";
import { Chain } from "@/types";
import Collapse from "@/components/common/Collapse";
import ChainForm from "../Form";
import useChainStore from "@/stores/chain.store";

const CreateChain = () => {
  const t = useTranslation();
  const { addChain } = useChainStore();
  const [chain] = useState();
  const [loaded, setLoaded] = useState(false);

  const onSubmit = useCallback(
    async (value: Chain) => {
      setLoaded(true);
      setLoaded(false);
      addChain(value.name?.trim() as string);
    },
    [addChain],
  );

  return (
    <Card
      withBorder
      shadow="md"
      w="100%"
      style={{ overflow: "visible" }}
    >
      <Collapse title={t("Create chain")}>
        <LoadingOverlay
          visible={loaded}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
        <ChainForm onSave={onSubmit} chain={chain} action="Create" />
      </Collapse>
    </Card>
  );
};

export default CreateChain;
