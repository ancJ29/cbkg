import * as z from "zod";
import { reservationStatusEnum } from "./enums";

export const reservationSchema = z.object({
  id: z.string(),
  contact: z.string(),
  phone: z.string(),
  code: z.string(),
  branchId: z.string(),
  chainId: z.string(),
  tableId: z.string(),
  date: z.date(),
  from: z.date(),
  to: z.date().nullish(),
  note: z.string().nullish(),
  status: reservationStatusEnum,
  staffId: z.string().nullish(),
  adults: z.number().int(),
  children: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
