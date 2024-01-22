import { branchSchema as prismaBranchSchema } from "@/auto-generated/prisma-schema";
import z from "zod";

export const branchSchema = prismaBranchSchema.partial({
  createdAt: true,
  updatedAt: true,
});
export type Branch = z.infer<typeof branchSchema>;
