import { createStore } from "zustand";

type CommonStore = {
  axiosLoading: boolean;
  setAxiosLoading: (value: boolean) => void;
};

export default createStore<CommonStore>((set) => ({
  axiosLoading: false,
  setAxiosLoading: (value: boolean) => {
    set(() => ({ axiosLoading: value || false }));
  },
}));
