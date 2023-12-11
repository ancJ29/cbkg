import useTranslation from "@/hooks/useTranslation";
import { registerBranch } from "@/services";
import { Card, LoadingOverlay } from "@mantine/core";
import { useCallback, useState } from "react";
import { STATUS_CODE, Branch } from "@/types";
import Collapse from "@/components/common/Collapse";
import BranchForm from "../Form";
import useBranchStore from "@/stores/branch.store";

const CreateBranch = ({
  setTriggerBranch,
}: {
  setTriggerBranch?: (value: (prevState: number) => number) => void;
}) => {
  const t = useTranslation();
  const branchStore = useBranchStore();
  const [branch] = useState();
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");
  const [trigger, setTrigger] = useState(Date.now());

  const onSubmit = useCallback(
    async (value: Branch) => {
      setLoaded(true);
      const response = await registerBranch(value);
      setLoaded(false);
      if (response.status >= STATUS_CODE.ERROR) {
        setError(response.error || "Error!!!");
      } else {
        branchStore.addBranch(response.data);
        setError("");
      }
      setTrigger((state) => state + 1);
      setTriggerBranch && setTriggerBranch((state) => state + 1);
    },
    [branchStore, setTriggerBranch],
  );

  return (
    <Card
      withBorder
      shadow="md"
      w="100%"
      style={{ overflow: "visible" }}
    >
      <Collapse title={t("Create branch")}>
        <LoadingOverlay
          visible={loaded}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
        <BranchForm
          onSave={onSubmit}
          branch={branch}
          action="Create"
          error={error}
          trigger={trigger}
        />
      </Collapse>
    </Card>
  );
};

export default CreateBranch;
