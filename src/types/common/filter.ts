import { Dayjs } from "dayjs";

export type FilterProps = {
  chainId?: string;
  branchId?: string;
  active?: boolean;
  name?: string;
  status?: string | string[];
  date?: Dayjs;
};
