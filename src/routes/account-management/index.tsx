import AccountTable from "@/components/AccountManagement/AccountTable";
import RegistrationPanel from "@/components/AccountManagement/RegistrationPanel";
import callApi from "@/services/api";
import logger from "@/services/logger";
import { fetchUsers } from "@/services/user";
import { User as Account, User } from "@/types";
import { Stack } from "@mantine/core";
import { useCallback, useEffect, useState } from "react";

const AccountManagement = () => {
  const [accounts, setAccounts] = useState<User[]>([]);

  const _reload = useCallback((forceReload = false) => {
    _loadAccounts(forceReload).then(setAccounts);
  }, []);

  useEffect(() => {
    _reload();
  }, [_reload]);

  const addAccount = useCallback(
    async (account: Account) => _addAccount(account, _reload),
    [_reload],
  );

  const updateAccount = useCallback(
    async (account: Account) => _updateAccount(account, _reload),
    [_reload],
  );

  const disableAccount = useCallback(
    async (id: string) => _disableAccount(id, _reload),
    [_reload],
  );

  return (
    <Stack gap={10} bg="gray.1" w="100%" h="100%" p={10}>
      <RegistrationPanel addAccount={addAccount} />
      <AccountTable
        accounts={accounts}
        updateAccount={updateAccount}
        disableAccount={disableAccount}
      />
    </Stack>
  );
};

export default AccountManagement;

async function _loadAccounts(
  forceReload = false,
): Promise<Account[]> {
  const res = await fetchUsers(100, "", forceReload);
  return res?.users || [];
}

async function _addAccount(
  account: Account,
  _reload: (_: boolean) => void,
) {
  await callApi<unknown, unknown>({
    action: "add-user",
    params: account,
  }).catch(() => {
    logger.error("Failed to add user", account);
  });
  _reload(true);
  return "";
}

async function _updateAccount(
  account: Account,
  _reload: (_: boolean) => void,
) {
  await callApi<unknown, unknown>({
    action: "edit-user",
    params: account,
  }).catch(() => {
    logger.error("Failed to update user", account);
  });
  _reload(true);
  return "";
}

async function _disableAccount(
  id: string,
  _reload: (_: boolean) => void,
) {
  await callApi<unknown, unknown>({
    action: "disable-users",
    params: { ids: [id] },
  }).catch(() => {
    logger.error("Failed to add user", id);
  });
  _reload(true);
  return "";
}
