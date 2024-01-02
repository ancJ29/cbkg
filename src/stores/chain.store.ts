import { TAKE } from "@/configs/constants";
import { loadChains } from "@/services";
import callApi, { isError } from "@/services/api";
import { Chain, OptionProps } from "@/types";
import {
  buildOption,
  getCursor,
  sortByKey,
  uniqueByKey,
} from "@/utils";
import { dataLoader } from "@/utils/data-loader";
import { generateMap } from "@/utils/object";
import { create } from "zustand";

type ChainStore = {
  chains: Chain[];
  options: OptionProps[];
  chainsById: { [key: string]: Chain };
  loadChains: (keyword?: string, search?: boolean) => void;
  addChain: (name: string) => Promise<string | undefined>;
  editChain: (user: Chain) => Promise<string | undefined>;
  deleteChain: (id: string) => Promise<string | undefined>;
};

export default create<ChainStore>((set, get) => ({
  chains: [],
  options: [],
  chainsById: {},
  loadChains: async (keyword?: string, search?: boolean) => {
    const { data } = await dataLoader<Chain>(
      TAKE,
      getCursor(get().chains, "id"),
      _fetch.bind(null, keyword, search),
    );
    _update(data, set);
  },

  addChain: async (name: string) => {
    const res = await callApi({
      action: "add-chain",
      params: { name: name.trim() },
    });
    if (isError(res)) {
      return res.error || "Unknown error";
    }
    const chains = get().chains;
    chains.push({ id: res.data?.id || "", name });
    _update(chains, set);
  },

  editChain: async (editedChain: Chain) => {
    const res = await callApi({
      action: "update-chain",
      params: editedChain,
    });
    if (isError(res)) {
      return res.error || "Unknown error";
    }
    _update(
      get().chains.map((chain) =>
        chain.id === editedChain.id ? editedChain : chain,
      ),
      set,
    );
  },

  deleteChain: async (id: string) => {
    const res = await callApi({
      action: "delete-chain",
      params: { id: id },
    });
    if (isError(res)) {
      return res.error || "Unknown error";
    }
    _update(
      get().chains.filter((chain) => chain.id !== id),
      set,
    );
  },
}));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function _update(
  _chains: Chain[],
  setter: (
    fn: () => {
      chains: Chain[];
      chainsById: { [key: string]: Chain };
      options: OptionProps[];
    },
  ) => void,
) {
  const chains = sortByKey(uniqueByKey(_chains, "id"), "id");
  const chainsById = generateMap<Chain>(chains);
  const options = buildOption(chains);
  setter(() => ({
    chains,
    chainsById,
    options,
  }));
}

async function _fetch(
  keyword?: string,
  search?: boolean,
  cursor?: string,
) {
  return loadChains({
    take: TAKE,
    cursor: search ? "" : cursor,
    name: keyword,
  }).then((res) => {
    return {
      data: res.data?.chains || [],
      cursor: res.data?.cursor || "",
    } as { data: Chain[]; cursor: string };
  });
}
