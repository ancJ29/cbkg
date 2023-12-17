import useTranslation from "@/hooks/useTranslation";
import { Card } from "@mantine/core";
import { useState } from "react";
import Collapse from "@/components/common/Collapse";
import BranchForm from "../Form";
import useBranchStore from "@/stores/branch.store";

const CreateBranch = () => {
  const t = useTranslation();
  const { addBranch } = useBranchStore();
  const [branch] = useState();

  return (
    <Card
      withBorder
      shadow="md"
      w="100%"
      style={{ overflow: "visible" }}
    >
      <Collapse title={t("Create branch")}>
        <BranchForm
          onSave={addBranch}
          branch={branch}
          action="Create"
        />
      </Collapse>
    </Card>
  );
};

export default CreateBranch;
