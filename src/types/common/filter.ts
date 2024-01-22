import { Dayjs } from "dayjs";

export type FilterProps = {
  chainId?: string | null;
  branchId?: string | null;
  active?: boolean;
  keyword?: string;
  phone?: string;
  status?: string | string[] | null;
  statuses?: string[] | null;
  date?: Dayjs | string;
  from?: Dayjs | string | null;
  to?: Dayjs | string | null;
  _on?: boolean;
};
