import { Params } from "@/types/params";
import callApi from "./api";
import { ApiResponse } from "@/types/common/api";

export async function getChains(value: Params): Promise<ApiResponse> {
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
export async function registerChains(
  value: Params,
): Promise<ApiResponse> {
  const res = await callApi({
    params: value,
    action: "add-chain",
  });
  return {
    status: res.status || 200,
    data: res.data,
    error: res.error,
  };
}
export async function updateChains(
  value: Params,
): Promise<ApiResponse> {
  const res = await callApi({
    params: value,
    action: "update-chain",
  });
  return {
    status: res.status || 200,
    data: res.data,
    error: res.error,
  };
}
export async function deleteChains(id: string): Promise<ApiResponse> {
  const res = await callApi({
    params: { id: id },
    action: "delete-chain",
  });
  return {
    status: res.status || 200,
    data: res.data,
    error: res.error,
  };
}
