import callApi from "@/services/api";
import logger from "@/services/logger";
import useAuthStore from "@/stores/auth.store";
import { Branch, Chain, OptionProps, User } from "@/types";
import { buildOption, generateMap } from "@/utils";
import { create } from "zustand";

type MetaDataStore = {
  branches: Branch[];
  chains: Chain[];
  defaultChainId: string;
  defaultBranchId: string;
  branchesById: { [key: string]: Branch };
  chainsById: { [key: string]: Chain };
  chainOptions: OptionProps[];
  branchOptions: OptionProps[];
  branchOptionsByChainId: { [key: string]: OptionProps[] };
  loadMetaData: () => Promise<void>;
};

export default create<MetaDataStore>((set) => ({
  branches: [],
  chains: [],
  defaultChainId: "",
  defaultBranchId: "",
  branchesById: {},
  chainsById: {},
  chainOptions: [],
  branchOptions: [],
  branchOptionsByChainId: {},

  loadMetaData: async () => {
    const user = useAuthStore.getState().user;
    const { chains, branches } = await _chainsAndBranches(user);
    const chainOptions = buildOption(chains);
    const branchOptionsByChainId =
      _buildBranchOptionsByChainId(branches);
    set(() => ({
      branches,
      chains,
      chainsById: generateMap<Chain>(chains),
      branchesById: generateMap<Branch>(branches),
      chainOptions: buildOption(chains),
      branchOptions: buildOption(branches),
      branchOptionsByChainId,
      ..._defaultChainAndBranchId(
        chainOptions,
        branchOptionsByChainId,
      ),
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

function _defaultChainAndBranchId(
  chainOptions: OptionProps[],
  branchOptionsByChainId: Record<string, OptionProps[]>,
) {
  if (chainOptions.length !== 1) {
    return { defaultChainId: "", defaultBranchId: "" };
  }
  const defaultChainId = (chainOptions[0]?.value || "").toString();

  if (branchOptionsByChainId[defaultChainId]?.length !== 1) {
    return { defaultChainId, defaultBranchId: "" };
  }
  const defaultBranchId = (
    branchOptionsByChainId[defaultChainId][0]?.value || ""
  ).toString();
  return { defaultChainId, defaultBranchId };
}

async function _chainsAndBranches(user?: User | null) {
  const [_chains, _branches] = await Promise.all([
    _loadChains(),
    _loadBranches(),
  ]);
  if (["ADMIN", "OWNER"].includes(user?.role || "")) {
    return {
      chains: _chains,
      branches: _branches,
    };
  }
  if (user?.chains) {
    const chainIds = user.chains.map((chain) => chain.id);
    const chains = _chains.filter((chain) =>
      chainIds.includes(chain.id),
    );
    const branches = _branches.filter((branch) =>
      chainIds.includes(branch.chainId),
    );
    return { chains, branches };
  }
  const chainsById = generateMap<Chain>(_chains);
  const branchesById = generateMap<Branch>(_branches);
  if (user?.branches) {
    const branches = user.branches.map(
      (branch) => branchesById[branch.id],
    );
    const chainIds = branches.map((branch) => branch.chainId);
    const chains = [...new Set(chainIds)].map(
      (chainId) => chainsById[chainId],
    );
    return { chains, branches };
  }
  return { chains: [], branches: [] };
}
