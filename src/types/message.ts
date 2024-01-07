import { Dayjs } from "dayjs";

export type Message = {
  id: string;
  name?: string;
  code?: string;
  from?: string;
  destinations?: string;
  templateId?: string;
  params?: { code: string };
  content?: string;
  status?: string;
  sendAfter?: string | null;
  sentAt?: string | null;
  createdAt?: Dayjs;
  updatedAt?: Dayjs;
};
