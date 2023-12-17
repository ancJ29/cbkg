import { TAKE } from "@/configs/constants";
import {
  isError,
  loadChains,
  registerChains,
  uniqueByKey,
} from "@/services";
import { Chain, OptionProps } from "@/types";
import { buildOption } from "@/utils/array";
import { dataLoader } from "@/utils/data-loader";
import { create } from "zustand";

type ChainStore = {
  chains: Chain[] | [];
  error: string;
  cursor: string;
  options: OptionProps[];
  loadChains: (keyword?: string, search?: boolean) => void;
  addChain: (name: string) => void;
  editChain: (user: Chain) => void;
  deleteChain: (id: string) => void;
};

export default create<ChainStore>((set, get) => ({
  chains: [],
  error: "",
  cursor: "",
  options: [],
  loadChains: async (keyword?: string, search?: boolean) => {
    const { data, cursor } = await dataLoader<Chain>(
      TAKE,
      get().cursor,
      _fetch.bind(null, keyword, search),
    );
    const _chains = uniqueByKey(
      ((get().chains || []) as Chain[]).concat(data),
      "id",
    );
    set(() => ({
      cursor,
      chains: uniqueByKey(_chains, "id"),
      options: buildOption(_chains),
    }));
  },
  addChain: async (name: string) => {
    const res = await registerChains({
      name: name.trim(),
    });
    const _chain = { id: res.data?.id, name: name };
    set((state) => ({
      chains: isError(res)
        ? uniqueByKey([...state.chains], "id")
        : uniqueByKey([_chain, ...state.chains], "id"),
      error: isError(res) ? res.error : "",
    }));
  },
  editChain: (editedChain: Chain) => {
    set((state) => ({
      chains: state.chains.map((chain) =>
        chain.id === editedChain.id ? editedChain : chain,
      ),
    }));
  },
  deleteChain: (id: string) => {
    set((state) => ({
      chains: state.chains.filter((chain) => chain.id !== id),
    }));
  },
}));

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
