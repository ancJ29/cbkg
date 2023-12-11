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
  .or(z.literal("OWNER"))
  .or(z.literal("CHAIN_MANAGER"))
  .or(z.literal("MANAGER"))
  .or(z.literal("STAFF"));
export type Role = z.infer<typeof role>;

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: role,
  branch: z
    .object({
      id: z.string(),
      name: z.string().optional(),
      address: z.string().optional(),
    })
    .optional(),
  chain: z
    .object({
      id: z.string(),
      name: z.string().optional(),
    })
    .optional(),
});

type User = z.infer<typeof userSchema>;
