import { chainSchema as prismaChainSchema } from "@/auto-generated/prisma-schema";
import z from "zod";

export const chainSchema = prismaChainSchema
  .extend({
    totalBranches: z.number().optional(),
  })
  .partial({
    createdAt: true,
    updatedAt: true,
  });

export type Chain = z.infer<typeof chainSchema>;
