import callApiV2 from "@/services/api-v2";
import logger from "@/services/logger";
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
  loadMetaData: () => Promise<void>;
};

export default create<MetaDataStore>((set) => ({
  branches: [],
  chains: [],
  branchesById: {},
  chainsById: {},
  chainOptions: [],
  branchOptions: [],
  loadMetaData: async () => {
    const [branches, chains] = await Promise.all([
      _loadBranches(),
      _loadChains(),
    ]);
    const branchesById = generateMap<Branch>(branches);
    const chainsById = generateMap<Chain>(chains);
    const chainOptions = buildOption(chains);
    const branchOptions = buildOption(branches);
    set(() => ({
      branches,
      chains,
      branchesById,
      chainsById,
      chainOptions,
      branchOptions,
    }));
  },
}));

async function _loadBranches(): Promise<Branch[]> {
  const { branches } =
    (await callApiV2<unknown, { branches: Branch[] }>({
      action: "get-branches",
      params: {},
      options: { noLoading: true },
    })) || {};
  logger.debug("branches loaded", branches || []);
  return branches || [];
}

async function _loadChains(): Promise<Chain[]> {
  const { chains } =
    (await callApiV2<unknown, { chains: Chain[] }>({
      action: "get-chains",
      params: {},
      options: { noLoading: true },
    })) || {};
  logger.debug("chains loaded", chains || []);
  return chains || [];
}
