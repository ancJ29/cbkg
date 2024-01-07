import { Dayjs } from "dayjs";
import { Branch, Chain } from "./";

export type Reservation = {
  id?: string;
  contact?: string;
  phone?: string;
  code?: string;
  branchId?: string | null;
  chainId?: string | null;
  branch?: Branch;
  chain?: Chain;
  date?: Dayjs | string;
  time?: string | null;
  from?: Dayjs | string | null;
  to?: Dayjs | null;
  note?: string | null;
  staffId?: string;
  createdAt?: Dayjs;
  updatedAt?: Dayjs;
  status?: string | string[] | null;
  customerName?: string;
  children?: number;
  adults?: number;
  tableId?: string;
  object?: string | null;
};
