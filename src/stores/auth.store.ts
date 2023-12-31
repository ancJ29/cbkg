import { AuthStore, userSchema } from "@/types/auth";
import jwtDecode from "jwt-decode";
import z from "zod";
import { create } from "zustand";

const useAuthStore = create<AuthStore>((set, get) => ({
  token: "",
  user: null,

  loadToken: () => {
    const token =
      localStorage.getItem("token") ||
      sessionStorage.getItem("token");
    get().setToken(token || "");
  },

  setToken: (token: string, remember?: boolean) => {
    if (token) {
      const user = _decode(token);
      set(() => (user ? { user, token } : { user: null, token: "" }));
      if (user) {
        remember
          ? localStorage.setItem("token", token)
          : sessionStorage.setItem("token", token);
      }
    }
  },

  removeToken: () => {
    set(() => ({ user: null, token: "" }));
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
  },
}));

export default useAuthStore;

const payloadSchema = z.object({
  payload: userSchema,
});

function _decode(token: string) {
  const data = jwtDecode(token);
  const res = payloadSchema.safeParse(data);
  return res.success ? res.data.payload : null;
}
