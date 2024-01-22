import { messageSchema as prismaMessageSchema } from "@/auto-generated/prisma-schema";
import * as z from "zod";

const messageSchema = prismaMessageSchema.extend({
  params: z
    .object({
      code: z.string(),
    })
    .optional(),
});

export type Message = z.infer<typeof messageSchema>;
