import { TAKE } from "@/configs/constants";
import {
  isError,
  loadChains,
  registerChains,
  uniqueByKey,
} from "@/services";
import { Chain } from "@/types";
import { create } from "zustand";

type ChainStore = {
  chains: Chain[] | [];
  error: string;
  cursor: string;
  loadChains: (keyword?: string, search?: boolean) => void;
  addChain: (name: string) => void;
  editChain: (user: Chain) => void;
  deleteChain: (id: string) => void;
};

export default create<ChainStore>((set, get) => ({
  chains: [],
  error: "",
  cursor: "",
  loadChains: async (keyword?: string, search?: boolean) => {
    let stop = true;
    do {
      const res = await loadChains({
        take: TAKE,
        cursor: search ? "" : get().cursor,
        name: keyword,
      });
      if (isError(res)) {
        set((state) => ({
          error: res.error,
          users: [...state.chains] || [],
        }));
        stop = false;
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

        stop = chains.length >= TAKE;
      }
    } while (stop);
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
