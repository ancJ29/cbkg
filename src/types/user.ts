import z from "zod";

export const roleEnums = z.enum([
  "ADMIN",
  "OWNER",
  "CHAIN_MANAGER",
  "MANAGER",
  "STAFF",
]);

export type Role = z.infer<typeof roleEnums>;

export const userSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  fullName: z.string().optional(),
  role: roleEnums,
  chainIds: z.string().array().optional(),
  branchIds: z.string().array().optional(),
  chains: z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .array()
    .optional(),
  branches: z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .array()
    .optional(),
  active: z.boolean().optional(),
  password: z.string().optional(),
});

export type User = z.infer<typeof userSchema>;

export type UserRequest = {
  id?: string;
  name?: string;
  fullName?: string;
  role?: Role;
  password?: string;
  chainId?: string;
  branchIds?: string[] | string;
  active?: boolean;
};

export type AddUserRequest = {
  id: string;
  name: string;
  role: Role;
  password: string;
  chainIds?: string[];
  branchIds?: string[] | string;
};

export type EditUserRequest = {
  id: string;
  name: string;
};
