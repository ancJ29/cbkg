import { TAKE } from "@/configs/constants";
import { isError, loadBranches } from "@/services";
import callApi from "@/services/api";
import { Branch } from "@/types";
import { getCursor, sortByKey, uniqueByKey } from "@/utils";
import { dataLoader } from "@/utils/data-loader";
import { generateMap } from "@/utils/object";
import { create } from "zustand";

type BranchStore = {
  branches: Branch[];
  branchesById: { [key: string]: Branch };
  loadBranches: () => void;
  addBranch: (user: Branch) => Promise<string | undefined>;
  editBranch: (user: Branch) => Promise<string | undefined>;
  deleteBranch: (id: string) => Promise<string | undefined>;
};

export default create<BranchStore>((set, get) => ({
  branches: [],
  error: "",
  branchesById: {},
  loadBranches: async () => {
    const { data, cursor } = await dataLoader<Branch>(
      TAKE,
      getCursor(get().branches, "id"),
      _fetch,
    );
    const branches = sortByKey(
      uniqueByKey(
        ((get().branches || []) as Branch[]).concat(data),
        "id",
      ),
      "id",
    );
    const branchesById = generateMap<Branch>(branches);
    set(() => ({ cursor, branches, branchesById }));
  },
  addBranch: async (branch: Branch) => {
    const res = await callApi({
      params: branch,
      action: "add-branch",
    });
    if (isError(res)) {
      return res.error || "Unknown error";
    }
    const branches = get().branches;
    branches.push(branch);
    _update(branches, set);
  },

  editBranch: async (_branch: Branch) => {
    const res = await callApi({
      params: _branch,
      action: "update-branch",
    });
    if (isError(res)) {
      return res.error || "Unknown error";
    }
    _update(
      get().branches.map((branch) =>
        branch.id === _branch.id ? _branch : branch,
      ),
      set,
    );
  },
  deleteBranch: async (id: string) => {
    const res = await callApi({
      params: { id: id },
      action: "delete-branch",
    });
    if (isError(res)) {
      return res.error || "Unknown error";
    }
    _update(
      get().branches.filter((branch) => branch.id !== id),
      set,
    );
  },
}));

function _update(
  _branches: Branch[],
  setter: (
    fn: () => {
      branches: Branch[];
      branchesById: { [key: string]: Branch };
    },
  ) => void,
) {
  const branches = sortByKey(uniqueByKey(_branches, "id"), "id");
  const branchesById = generateMap<Branch>(branches);
  setter(() => ({
    branches,
    branchesById,
  }));
}

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
