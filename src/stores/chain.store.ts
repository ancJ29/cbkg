import { create } from "zustand";
import { Chain, STATUS_CODE } from "@/types";
import { loadChains, registerChains, uniqueByKey } from "@/services";
import { TAKE } from "@/configs/constants";

const useChainStore = create<ChainStore>((set, get) => ({
  chains: [],
  error: "",
  cursor: "",
  loadChains: async (keyword?: string, search?: boolean) => {
    let shouldFetchMore = true;
    do {
      const res = await loadChains({
        take: TAKE,
        cursor: search ? "" : get().cursor,
        name: keyword,
      });
      if (res.status >= STATUS_CODE.ERROR) {
        set((state) => ({
          error: res.error,
          users: [...state.chains] || [],
        }));
        shouldFetchMore = false;
      } else {
        const { chains, cursor } = res.data;
        const newChains = uniqueByKey(
          [...get().chains, ...chains],
          "id",
        );

        set(() => ({
          cursor: chains.length >= TAKE ? cursor : "",
          chains: newChains,
        }));

        shouldFetchMore = chains.length >= TAKE;
      }
    } while (shouldFetchMore);
  },
  addChain: async (name: string) => {
    const res = await registerChains({
      name: name.trim(),
    });
    const _chain = { id: res.data.id, name: name };
    set((state) => ({
      chains:
        STATUS_CODE.ERROR <= res.status
          ? uniqueByKey([...state.chains], "id")
          : uniqueByKey([_chain, ...state.chains], "id"),
      error: STATUS_CODE.ERROR <= res.status ? res.error : "",
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

export default useChainStore;

type ChainStore = {
  chains: Chain[] | [];
  error: string;
  cursor: string;
  loadChains: (keyword?: string, search?: boolean) => void;
  addChain: (name: string) => void;
  editChain: (user: Chain) => void;
  deleteChain: (id: string) => void;
};
