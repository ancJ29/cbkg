import { Branch, Chain } from ".";
import z from "zod";

export type User = {
  id?: string;
  fullName: string;
  name: string;
  active?: boolean;
  password?: string;
  chain?: Chain;
  branch?: Branch;
  role?: string;
};
const userSchema = z
  .object({
    id: z.string().optional(),
    ids: z.array(z.string()).optional(),
    name: z.string().optional(),
    fullName: z.string().optional(),
    role: z.string().optional(),
    password: z.string().optional(),
    chainId: z.string().optional(),
    branchId: z.string().optional(),
    active: z.boolean().optional(),
  })
  .optional();

export type UserRequest = z.infer<typeof userSchema>;
