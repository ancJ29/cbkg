import z from "zod";

const storeSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  softName: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
});
export type Store = z.infer<typeof storeSchema>;
