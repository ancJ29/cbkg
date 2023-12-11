import { ApiResponse, Branch } from "@/types";
import { Params } from "@/types/params";
import callApi from "./api";

export async function getBranches(
  value: Params,
): Promise<ApiResponse> {
  const res = await callApi({
    params: value,
    action: "get-branches",
  });
  return {
    status: res.status || 200,
    data: res.data,
    error: res.error,
  };
}
export async function registerBranch(
  value: Branch,
): Promise<ApiResponse> {
  const res = await callApi({
    params: value,
    action: "add-branch",
  });
  return {
    status: res.status || 200,
    data: res.data,
    error: res.error,
  };
}
export async function updateBranch(
  value: Branch,
): Promise<ApiResponse> {
  const res = await callApi({
    params: value,
    action: "update-branch",
  });
  return {
    status: res.status || 200,
    data: res.data,
    error: res.error,
  };
}
export async function deleteBranch(id: string): Promise<ApiResponse> {
  const res = await callApi({
    params: { id: id },
    action: "delete-branch",
  });
  return {
    status: res.status || 200,
    data: res.data,
    error: res.error,
  };
}
