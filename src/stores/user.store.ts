import { TAKE } from "@/configs/constants";
import { fetchUsers, getUsers, isError } from "@/services";
import callApi from "@/services/api";
import logger from "@/services/logger";
import useMetaDataStore from "@/stores/meta-data.store";
import {
  AddUserRequest,
  EditUserRequest,
  FilterProps,
  User,
} from "@/types";
import { getCursor, uniqueByKey } from "@/utils/array";
import { dataLoader } from "@/utils/data-loader";
import { create } from "zustand";

type UserStore = {
  users: User[] | [];
  _users: User[] | [];
  filter: FilterProps;
  loadUsers: (reloadAll?: boolean) => void;
  addUser: (user: AddUserRequest) => Promise<string | undefined>;
  editUser: (user: EditUserRequest) => Promise<string | undefined>;
  disableUser: (id: string) => Promise<string | undefined>;
  setFilter: (filter: FilterProps) => void;
};

export default create<UserStore>((set, get) => ({
  _users: [],
  users: [],
  filter: {},
  loadUsers: async (reloadAll = false) => {
    const { branches, chains } = useMetaDataStore.getState();

    const { data, cursor } = await dataLoader<User>(
      TAKE,
      reloadAll ? "" : getCursor(get().users, "id"),
      _fetch,
    );
    let _users = reloadAll ? [] : get().users;
    _users.push(...data);
    if (!reloadAll) {
      _users = uniqueByKey(_users, "id");
    }
    const users = await getUsers(
      _users,
      chains,
      branches,
      get().filter,
    );

    set(() => ({ cursor, users, _users: users }));
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

  setFilter: async (filter: FilterProps) => {
    const { chains, branches } = useMetaDataStore.getState();

    set(() => ({ filter }));

    const users = await getUsers(
      get()._users,
      chains,
      branches,
      filter,
    );

    set(() => ({ filter, users }));
  },
}));

async function _fetch(_cursor?: string) {
  return fetchUsers(TAKE, _cursor).then((res) => ({
    data: res.users,
    cursor: res.cursor,
  }));
}
