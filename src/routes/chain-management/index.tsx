import CreateChain from "@/components/ChainManagement/Create";
import ChainTable from "@/components/ChainManagement/Table";
import { Stack } from "@mantine/core";
import { useState } from "react";

const ChainManagement = () => {
  const [triggerChain, setTriggerChain] = useState(Date.now());

  return (
    <Stack gap={10} bg="gray.1" w="100%" h="100%" p={10}>
      <CreateChain setTriggerChain={setTriggerChain} />
      <ChainTable triggerChain={triggerChain} />
    </Stack>
  );
};
export default ChainManagement;
