import jwtDecode from "jwt-decode";
import z from "zod";
import { create } from "zustand";

type AuthStore = {
  token: string;
  user: User | null;
  loadToken: () => void;
  setToken: (token: string) => void;
  removeToken: () => void;
};

const userSchema = z.object({
  id: z.string(),
  name: z.string(),
});

const payloadSchema = z.object({ payload: userSchema });

type User = z.infer<typeof userSchema>;

const useAuthStore = create<AuthStore>((set, get) => ({
  token: "",
  user: null,

  loadToken: () => {
    const token = localStorage.getItem("token");
    get().setToken(token || "");
  },

  setToken: (token) => {
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

function _decode(token: string) {
  const data = jwtDecode(token);
  const res = payloadSchema.safeParse(data);
  return res.success ? res.data.payload : null;
}
