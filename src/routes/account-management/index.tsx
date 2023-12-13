import { Stack } from "@mantine/core";
import useAuthStore from "@/stores/auth.store";
import AccountTable from "@/components/AccountManagement/Table";
import CreateAccount from "@/components/AccountManagement/Create";

const AccountManagement = () => {
  const { user } = useAuthStore();

  return (
    <Stack gap={10} bg="gray.1" w="100%" h="100%" p={10}>
      <CreateAccount />
      {user?.role === "ADMIN" && <AccountTable />}
    </Stack>
  );
};

export default AccountManagement;
