import * as z from "zod";
import { genderEnum } from "./enums";

export const customerSchema = z.object({
  id: z.string(),
  name: z.string(),
  gender: genderEnum.nullish(),
  phone: z.string(),
  email: z.string().nullish(),
  address: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
