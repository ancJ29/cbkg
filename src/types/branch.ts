import z from "zod";

export const branchSchema = z.object({
  id: z.string(),
  name: z.string(),
  chainId: z.string(),
  shortName: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  address: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type Branch = z.infer<typeof branchSchema>;
