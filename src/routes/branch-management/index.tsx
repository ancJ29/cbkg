import CreateBranch from "@/components/BranchManagement/CreateBranchForm";
import BranchTable from "@/components/BranchManagement/TableBranch";
import { Stack } from "@mantine/core";

const BranchManagement = () => {
  return (
    <Stack gap={10} bg="gray.1" w="100%" h="100%" p={10}>
      <CreateBranch />
      <BranchTable />
    </Stack>
  );
};

export default BranchManagement;
