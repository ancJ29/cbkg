import { TAKE } from "@/configs/constants";
import {
  isError,
  loadBranches,
  registerBranch,
  uniqueByKey,
} from "@/services";
import { Branch } from "@/types";
import { create } from "zustand";

export type BranchStore = {
  branches: Branch[] | [];
  cursor: string;
  error: string;
  loadBranches: () => void;
  addBranch: (user: Branch) => void;
  editBranch: (user: Branch) => void;
  deleteBranch: (id: string) => void;
};

export default create<BranchStore>((set, get) => ({
  branches: [],
  cursor: "",
  error: "",
  loadBranches: async () => {
    let stop = true;
    do {
      const res = await loadBranches({
        take: TAKE,
        cursor: get().cursor,
      });
      if (isError(res)) {
        set(() => ({
          error: res.error,
        }));
        stop = false;
      } else {
        const { branches, cursor } = res.data;
        const newBranches = uniqueByKey(
          [...get().branches, ...branches],
          "id",
        );

        set(() => ({
          cursor: branches.length >= TAKE ? cursor : "",
          branches: newBranches,
        }));

        stop = branches.length >= TAKE;
      }
    } while (stop);
  },
  addBranch: async (branch: Branch) => {
    const res = await registerBranch(branch);
    set((state) => ({
      branches: isError(res)
        ? [...state.branches]
        : [branch, ...state.branches],
      error: isError(res) ? res.error : "",
    }));
  },
  editBranch: (_branch: Branch) => {
    set((state) => ({
      branches: state.branches.map((branch) =>
        branch.id === _branch.id ? _branch : branch,
      ),
    }));
  },
  deleteBranch: (id: string) => {
    set((state) => ({
      branches: state.branches.filter((branch) => branch.id !== id),
    }));
  },
}));
