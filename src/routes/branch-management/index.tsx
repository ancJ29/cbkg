import CreateBranch from "@/components/BranchManagement/CreateBranchForm";
import BranchTable from "@/components/BranchManagement/TableBranch";
import callApi from "@/services/api";
import logger from "@/services/logger";
import useMetaDataStore from "@/stores/meta-data.store";
import { Branch } from "@/types";
import { Stack } from "@mantine/core";
import { useCallback, useEffect, useState } from "react";

const BranchManagement = () => {
  const [branches, setBranches] = useState<Branch[]>([]);
  const { loadMetaData } = useMetaDataStore();

  const _reload = useCallback(
    (forceReload = false) => {
      _loadBranches(forceReload).then(setBranches);
      loadMetaData();
    },
    [loadMetaData],
  );

  useEffect(() => {
    _reload();
  }, [_reload]);

  const addBranch = useCallback(
    async (branch: Branch) => _addBranch(branch, _reload),
    [_reload],
  );

  const updateBranch = useCallback(
    (branch: Branch) => _updateBranch(branch, _reload),
    [_reload],
  );

  const deleteBranch = useCallback(
    (id: string) => _deleteBranch(id, _reload),
    [_reload],
  );

  return (
    <Stack gap={10} bg="gray.1" w="100%" h="100%" p={10}>
      <CreateBranch addBranch={addBranch} />
      <BranchTable
        branches={branches}
        updateBranch={updateBranch}
        deleteBranch={deleteBranch}
      />
    </Stack>
  );
};

export default BranchManagement;

async function _loadBranches(forceReload = false): Promise<Branch[]> {
  const res = await callApi<unknown, { branches: Branch[] }>({
    action: "get-branches",
    params: {},
    options: {
      forceReload,
    },
  });
  return res?.branches || [];
}

async function _addBranch(
  branch: Branch,
  _reload: (_: boolean) => void,
) {
  await callApi<unknown, unknown>({
    action: "add-branch",
    params: branch,
  }).catch(() => {
    logger.error("Failed to add branch", branch);
  });
  _reload(true);
  return "";
}

async function _updateBranch(
  branch: Branch,
  _reload: (_: boolean) => void,
) {
  await callApi<unknown, unknown>({
    action: "update-branch",
    params: branch,
  }).catch(() => {
    logger.error("Failed to update branch", branch);
  });
  _reload(true);
  return "";
}

async function _deleteBranch(
  id: string,
  _reload: (_: boolean) => void,
) {
  await callApi<unknown, unknown>({
    action: "delete-branch",
    params: { id },
  }).catch(() => {
    logger.error("Failed to delete branch", { id });
  });
  _reload(true);
}
