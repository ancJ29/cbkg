import CreateBranch from "@/components/StoreManagement/Create";
import StoreTable from "@/components/StoreManagement/Table";
import { Stack } from "@mantine/core";

const BranchManagement = () => {
  return (
    <Stack gap={10} bg="gray.1" w="100%" h="100%" p={10}>
      <CreateBranch />
      <StoreTable />
    </Stack>
  );
};

export default BranchManagement;
