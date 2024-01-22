import { reservationSchema as prismaReservationSchema } from "@/auto-generated/prisma-schema";
import { Dayjs } from "dayjs";
import { z } from "zod";
import { Branch, Chain } from "./";

const reservationSchema = prismaReservationSchema
  .extend({
    time: z.string().nullish(),
    object: z.string().nullish(),
    branchId: z.string().nullish(),
    chainId: z.string().nullish(),
    status: prismaReservationSchema.shape.status.nullish(),
  })
  .omit({
    date: true,
    from: true,
    to: true,
  })
  .partial();

export type Reservation = z.infer<typeof reservationSchema> & {
  branch?: Branch;
  chain?: Chain;
  date?: Dayjs | string;
  from?: Dayjs | string | null;
  to?: Dayjs | null;
};

export type ConfirmReservation = {
  code?: string;
  contact?: string;
  note?: string | null;
  reservationCode?: string;
};
