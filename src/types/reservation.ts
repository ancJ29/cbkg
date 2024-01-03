import { Dayjs } from "dayjs";

export type Reservation = {
  id: string;
  contact: string;
  phone?: string;
  code?: string;
  branchId: string | null;
  chainId?: string | null;
  date?: Dayjs | string;
  from?: Dayjs | null;
  to?: Dayjs | null;
  note: string | null;
  staffId?: string;
  createdAt?: Dayjs;
  updatedAt?: Dayjs;
  status?: string | string[] | null;
  customerName?: string;
  child?: number;
  adult?: number;
  tableId: string;
  object?: string | null;
  require?: string;
};
