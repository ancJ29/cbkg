import { TAKE } from "@/configs/constants";
import {
  isError,
  loadBranches,
  registerBranch,
  uniqueByKey,
} from "@/services";
import { Branch } from "@/types";
import { dataLoader } from "@/utils/data-loader";
import { create } from "zustand";

type BranchStore = {
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
    const { data, cursor } = await dataLoader<Branch>(
      TAKE,
      get().cursor,
      _fetch,
    );
    const branches = uniqueByKey(
      ((get().branches || []) as Branch[]).concat(data),
      "id",
    );
    set(() => ({ cursor, branches }));
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

async function _fetch(cursor?: string) {
  return loadBranches({
    take: TAKE,
    cursor,
  }).then((res) => {
    return {
      data: res.data?.branches || [],
      cursor: res.data?.cursor || "",
    } as { data: Branch[]; cursor: string };
  });
}
