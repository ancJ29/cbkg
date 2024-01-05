import ChainTable from "@/components/ChainManagement/ChainTable";
import CreateChainForm from "@/components/ChainManagement/CreateChainForm";
import callApiV2 from "@/services/api-v2";
import logger from "@/services/logger";
import useMetaDataStore from "@/stores/meta-data.store";
import { Chain } from "@/types";
import { Stack } from "@mantine/core";
import { useCallback, useEffect, useState } from "react";

const ChainManagement = () => {
  const [chains, setChains] = useState<Chain[]>([]);
  const { loadMetaData } = useMetaDataStore();

  const _reload = useCallback(() => {
    _loadChains().then(setChains);
    loadMetaData();
  }, [loadMetaData]);

  const deleteChain = useCallback(
    (id: string) => {
      callApiV2<unknown, unknown>({
        action: "delete-chain",
        params: { id },
      })
        .then(() => {
          _reload();
        })
        .catch(() => {
          logger.error("Failed to delete chain", { id });
        });
    },
    [_reload],
  );

  const updateChain = useCallback(
    async (chain: Chain) => {
      await callApiV2<unknown, unknown>({
        action: "update-chain",
        params: chain,
      });
      _reload();
      return "";
    },
    [_reload],
  );

  const addChain = useCallback(
    async (name: string) => {
      await callApiV2<unknown, unknown>({
        action: "add-chain",
        params: {
          name: name.trim(),
        },
      });
      _reload();
      return "";
    },
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

async function _loadChains(): Promise<Chain[]> {
  const res = await callApiV2<unknown, { chains: Chain[] }>({
    action: "get-chains",
    params: {},
  });
  return res?.chains || [];
}
