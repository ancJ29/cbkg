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
  chain: z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .optional(),
  branch: z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .optional(),
  active: z.boolean().optional(),
  password: z.string().optional(),
});

export type User = z.infer<typeof userSchema>;

const userRequestSchema = z
  .object({
    id: z.string().optional(),
    ids: z.array(z.string()).optional(),
    name: z.string().optional(),
    fullName: z.string().optional(),
    role: roleEnums.optional(),
    password: z.string().optional(),
    chainId: z.string().optional(),
    branchId: z.string().optional(),
    active: z.boolean().optional(),
  })
  .optional();

export type UserRequest = z.infer<typeof userRequestSchema>;
