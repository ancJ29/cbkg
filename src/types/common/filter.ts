import { Dayjs } from "dayjs";

export type FilterProps = {
  chainId?: string | null;
  branchId?: string | null;
  active?: boolean;
  name?: string;
  status?: string | string[] | null;
  date?: Dayjs | string;
  from?: Dayjs | string | null;
  to?: Dayjs | string | null;
};
