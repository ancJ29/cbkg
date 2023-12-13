import { TAKE } from "@/configs/constants";
import { getAccount, isError, manageUser } from "@/services";
import { sortByKey, uniqueByKey } from "@/services/utils/array";
import { UserRequest } from "@/types";
import { create } from "zustand";

type UserStore = {
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

export default create<UserStore>((set, get) => ({
  users: [],
  error: "",
  cursor: "",
  loadUsers: async () => {
    let stop = true;
    do {
      const res = await getAccount({
        take: TAKE,
        cursor: get().cursor,
      });
      if (isError(res)) {
        set(() => ({
          error: res.error,
        }));
        stop = false;
      } else {
        const { users, cursor } = res.data;
        const newUsers = sortByKey(
          uniqueByKey([...get().users, ...users], "id"),
          "active",
        );

        set(() => ({
          cursor: users.length >= TAKE ? cursor : "",
          users: newUsers,
        }));

        stop = users.length >= TAKE;
      }
    } while (stop);
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
      users: isError(res)
        ? uniqueByKey([...state.users], "id")
        : uniqueByKey([user, ...state.users], "id"),
      error: isError(res) ? res.error : "",
    }));
  },
  editUser: async (value: UserRequest) => {
    const res = await manageUser({
      action: apiUpdate[value?.role as keyof typeof apiUpdate],
      value: { id: value?.id as string },
    });
    if (isError(res)) {
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
    if (isError(res)) {
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
