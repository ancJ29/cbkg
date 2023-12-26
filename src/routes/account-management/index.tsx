import AccountTable from "@/components/AccountManagement/AccountTable";
import RegistrationPanel from "@/components/AccountManagement/RegistrationPanel";
import useAuthStore from "@/stores/auth.store";
import { Stack } from "@mantine/core";

const AccountManagement = () => {
  const { user } = useAuthStore();

  return (
    <Stack gap={10} bg="gray.1" w="100%" h="100%" p={10}>
      <RegistrationPanel />
      {/* TODO: handle other user too */}
      {user?.role === "ADMIN" && <AccountTable />}
    </Stack>
  );
};

export default AccountManagement;
