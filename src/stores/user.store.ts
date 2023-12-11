import { create } from "zustand";
import { STATUS_CODE, UserRequest } from "@/types";
import { sortByKey, uniqueByKey } from "@/services/utils/array";
import { getAccount, manageUser } from "@/services";
import { TAKE } from "@/configs/constants";

const useUserStore = create<UserStore>((set, get) => ({
  users: [],
  error: "",
  cursor: "",
  loadUsers: async () => {
    let shouldFetchMore = true;
    do {
      const res = await getAccount({
        take: TAKE,
        cursor: get().cursor,
      });
      if (res.status >= STATUS_CODE.ERROR) {
        set(() => ({
          error: res.error,
        }));
        shouldFetchMore = false;
      } else {
        const { users, cursor } = res.data;
        const newUsers = uniqueByKey(
          [...get().users, ...users],
          "id",
        ).sort((a, b) => sortByKey(a, b, "active"));

        set(() => ({
          cursor: users.length >= TAKE ? cursor : "",
          users: newUsers,
        }));

        shouldFetchMore = users.length >= TAKE;
      }
    } while (shouldFetchMore);
  },
  addUser: async (user: UserRequest) => {
    const res = await manageUser({
      action: apiAdd[user?.role as keyof typeof apiAdd],
      value: {
        name: user?.name?.trim(),
        password: user?.password?.trim() as string,
        chainId: user?.chainId as string,
        branchId: user?.branchId as string,
      },
    });
    set((state) => ({
      users:
        STATUS_CODE.ERROR <= res.status
          ? uniqueByKey([...state.users], "id")
          : uniqueByKey([user, ...state.users], "id"),
      error: STATUS_CODE.ERROR <= res.status ? res.error : "",
    }));
  },
  editUser: async (value: UserRequest) => {
    const res = await manageUser({
      action: apiUpdate[value?.role as keyof typeof apiUpdate],
      value: { id: value?.id as string },
    });
    if (STATUS_CODE.ERROR <= res.status) {
      set(() => ({
        error: res.error,
      }));
    } else {
      set((state) => ({
        users: state.users.map((user) =>
          user?.id === value?.id ? res.data : user,
        ),
      }));
    }
  },
  deleteUser: async (id: string) => {
    const res = await manageUser({
      action: "disable-users",
      value: {
        ids: [id],
      },
    });
    if (STATUS_CODE.ERROR <= res.status) {
      set(() => ({
        error: res.error,
      }));
    } else {
      set((state) => ({
        users: state.users.map((user) =>
          user?.id === id ? { ...user, active: false } : user,
        ),
      }));
    }
  },
}));

export default useUserStore;

export type UserStore = {
  users: UserRequest[] | [];
  error: string;
  cursor: string;
  loadUsers: () => void;
  addUser: (user: UserRequest) => void;
  editUser: (user: UserRequest) => void;
  deleteUser: (id: string) => void;
};

const apiAdd = {
  "CHAIN-MANAGER": "add-chain-manager",
  "MANAGER": "add-manager",
  "STAFF": "add-staff-by-manager",
};

const apiUpdate = {
  "CHAIN-MANAGER": "update-chain-manager",
  "MANAGER": "update-manager",
  "STAFF": "update-staff-by-manager",
};
