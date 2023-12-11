import CreateBranch from "@/components/StoreManagement/Create";
import StoreTable from "@/components/StoreManagement/Table";
import { Stack } from "@mantine/core";
import { useState } from "react";

const BranchManagement = () => {
  const [trigger, setTrigger] = useState(Date.now());

  return (
    <Stack gap={10} bg="gray.1" w="100%" h="100%" p={10}>
      <CreateBranch setTriggerBranch={setTrigger} />
      <StoreTable triggerBranch={trigger} />
    </Stack>
  );
};

export default BranchManagement;
