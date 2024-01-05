import { createStore } from "zustand";

type CommonStore = {
  axiosLoading: boolean;
  counter: number;
  increaseLoadingCounter: () => void;
  decreaseLoadingCounter: () => void;
};

export default createStore<CommonStore>((set) => ({
  counter: 0,
  axiosLoading: false,
  increaseLoadingCounter: () => {
    set((state) => {
      const counter = state.counter + 1;
      return { counter, axiosLoading: counter > 0 };
    });
  },
  decreaseLoadingCounter: () => {
    set((state) => {
      const counter = Math.max(0, state.counter - 1);
      return { counter, axiosLoading: counter > 0 };
    });
  },
}));
