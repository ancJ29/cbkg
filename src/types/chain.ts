import z from "zod";

export const chainSchema = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  quantity: z.number().optional(),
});

export type Chain = z.infer<typeof chainSchema>;
