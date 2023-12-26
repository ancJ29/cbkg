import { Params } from "@/types";
import { ApiResponse } from "@/types/common/api";
import callApi from "../api";

export async function loadChains(
  value: Params,
): Promise<ApiResponse> {
  const res = await callApi({
    params: value,
    action: "get-chains",
  });
  return {
    status: res.status || 200,
    data: res.data,
    error: res.error,
  };
}
