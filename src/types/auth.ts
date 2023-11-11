import z from "zod";

export type AuthStore = {
  token: string;
  user: User | null;
  loadToken: () => void;
  setToken: (token: string, remember?: boolean) => void;
  removeToken: () => void;
};

const role = z
  .literal("ADMIN")
  .or(z.literal("STAFF").or(z.literal("MANAGER")));
export type Role = z.infer<typeof role>;

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: role,
});

type User = z.infer<typeof userSchema>;
