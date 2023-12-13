import CreateChain from "@/components/ChainManagement/Create";
import ChainTable from "@/components/ChainManagement/Table";
import { Stack } from "@mantine/core";

const ChainManagement = () => {
  return (
    <Stack gap={10} bg="gray.1" w="100%" h="100%" p={10}>
      <CreateChain />
      <ChainTable />
    </Stack>
  );
};
export default ChainManagement;
