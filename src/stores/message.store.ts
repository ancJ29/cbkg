import callApi, { isError } from "@/services/api";
import { create } from "zustand";

type UserStore = {
  message: [];
  loadMessage: () => void;
};

export default create<UserStore>((set) => ({
  message: [],
  loadMessage: async () => {
    const res = await callApi({
      action: "get-messages",
      params: {},
    });
    if (isError(res)) {
      return;
    }
    set({ message: res.data });
  },
}));
