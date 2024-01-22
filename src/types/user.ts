import {
  userSchema as prismaUserSchema,
  roleEnum,
} from "@/auto-generated/prisma-schema";
import z from "zod";
import { branchSchema } from "./branch";
import { chainSchema } from "./chain";

export const payloadSchema = z.object({
  role: roleEnum,
  userName: z.string(),
  fullName: z.string(),
  id: z.string(),
});

export type Payload = z.infer<typeof payloadSchema>;

export const userSchema = prismaUserSchema
  .partial({
    password: true,
    active: true,
    branchIds: true,
    chainIds: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    chains: chainSchema.array().optional(),
    branches: branchSchema.array().optional(),
  });

export type User = z.infer<typeof userSchema>;
