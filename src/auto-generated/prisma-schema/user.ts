import * as z from "zod";
import { roleEnum } from "./enums";

export const userSchema = z.object({
  id: z.string(),
  userName: z.string(),
  fullName: z.string(),
  password: z.string(),
  role: roleEnum.nullish(),
  active: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
  chainIds: z.string().array(),
  branchIds: z.string().array(),
});
