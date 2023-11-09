import { AuthStore, userSchema } from "@/types/auth";
import jwtDecode from "jwt-decode";
import z from "zod";
import { create } from "zustand";

const useAuthStore = create<AuthStore>((set, get) => ({
  token: "",
  user: null,

  loadToken: () => {
    const token = localStorage.getItem("token");
    get().setToken(token || "");
  },

  setToken: (token: string) => {
    if (token) {
      const user = _decode(token);
      set(() => (user ? { user, token } : { user: null, token: "" }));
      user && localStorage.setItem("token", token);
    }
  },

  removeToken: () => {
    set(() => ({ user: null, token: "" }));
    localStorage.removeItem("token");
  },
}));

export default useAuthStore;

const payloadSchema = z.object({ payload: userSchema });

function _decode(token: string) {
  const data = jwtDecode(token);
  const res = payloadSchema.safeParse(data);
  return res.success ? res.data.payload : null;
}
