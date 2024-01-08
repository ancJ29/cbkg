import z from "zod";
import { branchSchema } from "./branch";
import { chainSchema } from "./chain";

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
  userName: z.string(),
  fullName: z.string().optional(),
  role: roleEnums,
  chainIds: z.string().array().optional(),
  branchIds: z.string().array().optional(),
  chains: chainSchema.array().optional(),
  branches: branchSchema.array().optional(),
  active: z.boolean().optional(),
  password: z.string().optional(),
});

export type User = z.infer<typeof userSchema>;
