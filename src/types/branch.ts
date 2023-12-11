import z from "zod";
const branchSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  shortName: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  chainId: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});
export type Branch = z.infer<typeof branchSchema>;
