import * as z from "zod";

export const loginSchema = z.object({
  userName: z.string(),
  password: z.string(),
});

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
