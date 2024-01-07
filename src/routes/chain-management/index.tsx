import ChainTable from "@/components/ChainManagement/ChainTable";
import CreateChainForm from "@/components/ChainManagement/CreateChainForm";
import callApi from "@/services/api";
import logger from "@/services/logger";
import useMetaDataStore from "@/stores/meta-data.store";
import { Chain } from "@/types";
import { Stack } from "@mantine/core";
import { useCallback, useEffect, useState } from "react";

const ChainManagement = () => {
  const [chains, setChains] = useState<Chain[]>([]);
  const { loadMetaData } = useMetaDataStore();

  const _reload = useCallback(
    (forceReload = false) => {
      _loadChains(forceReload).then(setChains);
      loadMetaData();
    },
    [loadMetaData],
  );

  const addChain = useCallback(
    (name: string) => _addChain(name, _reload),
    [_reload],
  );

  const updateChain = useCallback(
    (chain: Chain) => _updateChain(chain, _reload),
    [_reload],
  );

  const deleteChain = useCallback(
    (id: string) => _deleteChain(id, _reload),
    [_reload],
  );

  useEffect(() => {
    _reload();
  }, [_reload]);

  return (
    <Stack gap={10} bg="gray.1" w="100%" h="100%" p={10}>
      <CreateChainForm addChain={addChain} />
      <ChainTable
        chains={chains}
        updateChain={updateChain}
        deleteChain={deleteChain}
      />
    </Stack>
  );
};

export default ChainManagement;

async function _loadChains(forceReload: boolean): Promise<Chain[]> {
  const res = await callApi<unknown, { chains: Chain[] }>({
    action: "get-chains",
    params: {},
    options: {
      forceReload,
    },
  });
  return res?.chains || [];
}

async function _addChain(
  name: string,
  _reload: (forceReload: boolean) => void,
) {
  await callApi<unknown, unknown>({
    action: "add-chain",
    params: {
      name: name.trim(),
    },
  }).catch(() => {
    logger.error("Failed to add chain", { name });
  });
  _reload(false);
  return "";
}

async function _updateChain(
  chain: Chain,
  _reload: (forceReload: boolean) => void,
) {
  await callApi<unknown, unknown>({
    action: "update-chain",
    params: chain,
  }).catch(() => {
    logger.error("Failed to update chain", chain);
  });
  _reload(false);
  return ""; // TODO: return error message
}

async function _deleteChain(
  id: string,
  _reload: (forceReload: boolean) => void,
) {
  await callApi<unknown, unknown>({
    action: "delete-chain",
    params: { id },
  }).catch(() => {
    logger.error("Failed to delete chain", { id });
  });
  _reload(true);
}
