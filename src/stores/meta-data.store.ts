import callApi from "@/services/api";
import logger from "@/services/logger";
import useAuthStore from "@/stores/auth.store";
import { Branch, Chain, OptionProps } from "@/types";
import { buildOption, generateMap } from "@/utils";
import { create } from "zustand";

type MetaDataStore = {
  branches: Branch[];
  chains: Chain[];
  branchesById: { [key: string]: Branch };
  chainsById: { [key: string]: Chain };
  chainOptions: OptionProps[];
  branchOptions: OptionProps[];
  branchOptionsByChainId: { [key: string]: OptionProps[] };
  loadMetaData: () => Promise<void>;
  branchOptionByRole?: OptionProps[];
  chainOptionByRole?: OptionProps[];
};

export default create<MetaDataStore>((set) => ({
  branches: [],
  chains: [],
  branchesById: {},
  chainsById: {},
  chainOptions: [],
  branchOptions: [],
  branchOptionsByChainId: {},

  loadMetaData: async () => {
    const user = useAuthStore.getState().user;
    const [branches, chains] = await Promise.all([
      _loadBranches(),
      _loadChains(),
    ]);
    const branchesById = generateMap<Branch>(branches);
    const chainsById = generateMap<Chain>(chains);
    const chainOptions = buildOption(chains);
    const branchOptions = buildOption(branches);
    const branchOptionByRole = user?.branches
      ? buildOption(user?.branches)
      : undefined;
    const chainOptionByRole = user?.chains
      ? buildOption(user?.chains)
      : undefined;

    set(() => ({
      branches,
      chains,
      branchesById,
      chainsById,
      chainOptions,
      branchOptions,
      branchOptionByRole,
      chainOptionByRole,
      branchOptionsByChainId: _buildBranchOptionsByChainId(branches),
    }));
  },
}));

async function _loadBranches(): Promise<Branch[]> {
  const { branches } =
    (await callApi<unknown, { branches: Branch[] }>({
      action: "get-branches",
      params: {},
      options: { noLoading: true },
    })) || {};
  logger.debug("branches loaded", branches || []);
  return branches || [];
}

async function _loadChains(): Promise<Chain[]> {
  const { chains } =
    (await callApi<unknown, { chains: Chain[] }>({
      action: "get-chains",
      params: {},
      options: { noLoading: true },
    })) || {};
  logger.debug("chains loaded", chains || []);
  return chains || [];
}

function _buildBranchOptionsByChainId(branches: Branch[]) {
  const branchesByChainId = branches.reduce(
    (acc: Record<string, Branch[]>, branch) => {
      const { chainId } = branch;
      if (!acc[chainId]) {
        acc[chainId] = [];
      }
      acc[chainId].push(branch);
      return acc;
    },
    {} as Record<string, Branch[]>,
  );
  return Object.entries(branchesByChainId).reduce(
    (acc, [key, branches]: [string, Branch[]]) => {
      acc[key] = buildOption(branches);
      return acc;
    },
    {} as Record<string, OptionProps[]>,
  );
}
