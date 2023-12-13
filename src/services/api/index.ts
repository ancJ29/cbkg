import useAuthStore from "@/stores/auth.store";
import useCommonStore from "@/stores/common.store";
import { ApiResponse } from "@/types/common/api";
import axios, { AxiosError } from "axios";
import logger from "../logger";

type ApiError = {
  status: number;
  error: string;
};

const base = import.meta.env.BASE_URL;

enum STATUS_CODE {
  "SUCCESS" = 200,
  "ERROR" = 400,
}

export default async function callApi<T>({
  params,
  action,
}: {
  action?: string;
  params?: T;
}): Promise<ApiResponse> {
  try {
    useCommonStore.getState().setAxiosLoading(true);
    const token = useAuthStore.getState().token;
    const res = await axios({
      method: "POST",
      url: base,
      data: { action, params },
      headers: {
        "Content-Type": "application/json",
        "Authorization": token ? `Bearer ${token}` : undefined,
      },
    });
    useCommonStore.getState().setAxiosLoading(false);
    return { status: res.status || 200, data: res.data };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ApiError>;

      logger.error("Request failed with status code", axiosError);

      return {
        status: axiosError.response?.status || 400,
        error: axiosError.response?.data?.error || "Unknown error",
      };
    } else {
      // Handle non-Axios errors
      logger.error("Non-Axios error occurred", error);
      return { status: 400, error: "Unknown error" };
    }
  }
}

export function isError(res: ApiResponse) {
  return STATUS_CODE.ERROR <= res.status;
}
