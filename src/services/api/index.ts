import useAuthStore from "@/stores/auth.store";
import axios, { AxiosError } from "axios";
import logger from "../logger";
import { ApiResponse, MyApiError } from "@/types/common/api";

const base = import.meta.env.BASE_URL;

export default async function callApi<T>({
  params,
  action,
}: {
  action?: string;
  params?: T;
}): Promise<ApiResponse> {
  try {
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
    return { status: res.status || 200, data: res.data };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<MyApiError>;

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
