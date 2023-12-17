import { TAKE } from "@/configs/constants";
import { isError } from "@/services";
import callApi from "@/services/api";
import logger from "@/services/logger";
import {
  AddUserRequest,
  Branch,
  Chain,
  EditUserRequest,
  User,
} from "@/types";
import { uniqueByKey } from "@/utils/array";
import { dataLoader } from "@/utils/data-loader";
import { generateMap } from "@/utils/object";
import { create } from "zustand";
import useBranchStore from "./branch.store";
import useChainStore from "./chain.store";

type UserStore = {
  users: User[] | [];
  error: string;
  cursor: string;
  loadUsers: (reloadAll?: boolean) => void;
  addUser: (user: AddUserRequest) => Promise<string | undefined>;
  editUser: (user: EditUserRequest) => Promise<string | undefined>;
  disableUser: (id: string) => Promise<string | undefined>;
};

export default create<UserStore>((set, get) => ({
  users: [],
  error: "",
  cursor: "",
  loadUsers: async (reloadAll = false) => {
    const { data, cursor } = await dataLoader<User>(
      TAKE,
      reloadAll ? "" : get().cursor,
      _fetch,
    );
    let users = reloadAll ? [] : get().users;
    users.push(...data);
    if (!reloadAll) {
      users = uniqueByKey(users, "id");
    }
    set(() => ({ cursor, users }));
  },
  addUser: async (user: AddUserRequest) => {
    logger.debug("add user", user);
    const res = await callApi({
      action: "add-user",
      params: user,
    });
    if (isError(res)) {
      return res.error || "Unknown error";
    }
    // TODO: refactor this...
    user.id = res.data?.id || "";
    set((state) => ({ users: [user as User, ...state.users] }));
  },
  editUser: async ({ id, name }: EditUserRequest) => {
    logger.debug("edit user", { id, name });
    const users = get().users;
    const user = users.find((user) => user.id === id);
    if (!user) {
      return;
    }
    const res = await callApi({
      action: "edit-user",
      params: { id, name },
    });
    if (isError(res)) {
      return res.error || "Unknown error";
    }
    user.name = name;
    set(() => ({ users: [...users] }));
  },
  disableUser: async (id: string) => {
    logger.debug("disable user", { id, name });
    const res = await callApi({
      action: "disable-users",
      params: { ids: [id] },
    });
    if (isError(res)) {
      return res.error || "Unknown error";
    }
    set((state) => ({
      users: state.users.map((user) =>
        user?.id === id ? { ...user, active: false } : user,
      ),
    }));
  },
}));

async function _fetch(cursor?: string) {
  return callApi({
    action: "get-users",
    params: {
      take: TAKE,
      cursor,
    },
  }).then((res) => {
    const chains = useChainStore.getState().chains;
    const branches = useBranchStore.getState().branches;
    const chainsById = generateMap<Chain>(chains);
    const branchesById = generateMap<Branch>(branches);
    const users: User[] = res.data?.users || [];
    users.map((user) => {
      user.chains = (user.chainIds || ([] as string[]))
        .map((id: string) => {
          if (chainsById[id]) {
            return chainsById[id];
          }
          return null;
        })
        .filter(Boolean) as {
        id: string;
        name: string;
      }[];
      user.branches = (user.branchIds || ([] as string[]))
        .map((id: string) => {
          if (branchesById[id]) {
            return branchesById[id];
          }
          return null;
        })
        .filter(Boolean) as {
        id: string;
        name: string;
      }[];
      return user;
    });
    return {
      data: users,
      cursor: res.data?.cursor || "",
    } as { data: User[]; cursor: string };
  });
}
