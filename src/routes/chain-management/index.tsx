import ChainTable from "@/components/ChainManagement/ChainTable";
import CreateChainForm from "@/components/ChainManagement/CreateChainForm";
import { Stack } from "@mantine/core";

const ChainManagement = () => {
  return (
    <Stack gap={10} bg="gray.1" w="100%" h="100%" p={10}>
      <CreateChainForm />
      <ChainTable />
    </Stack>
  );
};
export default ChainManagement;
