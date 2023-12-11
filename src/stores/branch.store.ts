import { create } from "zustand";
import { Branch, STATUS_CODE } from "@/types";
import { getBranches, uniqueByKey } from "@/services";
import { TAKE } from "@/configs/constants";

const useBranchStore = create<BranchStore>((set, get) => ({
  branches: [],
  cursor: "",
  error: "",
  loadBranches: async () => {
    let shouldFetchMore = true;
    do {
      const res = await getBranches({
        take: TAKE,
        cursor: get().cursor,
      });
      if (res.status >= STATUS_CODE.ERROR) {
        set((state) => ({
          error: res.error,
          branches: [...state.branches] || [],
        }));
        shouldFetchMore = false;
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

        shouldFetchMore = branches.length >= TAKE;
      }
    } while (shouldFetchMore);
  },
  addBranch: (user: Branch) => {
    set((state) => ({
      branches: [user, ...state.branches],
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

export default useBranchStore;

export type BranchStore = {
  branches: Branch[] | [];
  cursor: string;
  error: string;
  loadBranches: () => void;
  addBranch: (user: Branch) => void;
  editBranch: (user: Branch) => void;
  deleteBranch: (id: string) => void;
};
