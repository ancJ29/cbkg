import {
  branchSchema,
  chainSchema,
  userSchema,
} from "@/auto-generated/prisma-schema";
import * as z from "zod";

export const getSchema = z.object({
  cursor: z.string().optional(),
  take: z.number().min(1).max(100).optional().default(20),
});

export const addResponse = z.object({
  id: z.string(),
});

export const listResponse = z.object({
  cursor: z.string(),
});

export const successResponse = z.object({
  success: z.boolean(),
});

export const dateSchema = z
  .number()
  .or(z.string()) // TODO: remove this line after converting all date to number
  .transform((val) => new Date(val));

export const futureDateSchema = dateSchema.refine(
  (val) => val.getTime() > Date.now(),
);

// 028-3933-9999 / 0912-345-678 → 842839339999
export const emailSchema = z.string().email();
export const phoneSchema = z.string().regex(/^(84\d{9}|842\d{10})$/);

export const emailOrPhoneSchema = {
  email: emailSchema.optional(),
  phone: phoneSchema,
};

export const payloadSchema = userSchema
  .pick({
    id: true,
    userName: true,
    fullName: true,
    role: true,
  })
  .extend({
    chainId: z.string().optional(),
    branchIds: z.string().array().optional(),
    chainIds: z.string().array().optional(),
    branches: branchSchema
      .pick({
        id: true,
        name: true,
        shortName: true,
        address: true,
        chainId: true,
      })
      .array()
      .optional(),
    chains: chainSchema
      .pick({
        id: true,
        name: true,
      })
      .array()
      .optional(),
  });
