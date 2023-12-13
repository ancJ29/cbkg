import { FilterProps } from "@/services";
import { ApiResponse, Branch } from "@/types";
import { Params } from "@/types/params";
import callApi from "./api";

export async function loadBranches(
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

export const branchOptions = (
  branches: Branch[],
  chainId: string,
) => {
  return branches
    .filter((branch) => branch.chainId === chainId)
    .map(({ id, name }) => ({
      id: id as string,
      name: name as string,
    }));
};

export async function getBranches(
  data: Branch[],
  filter?: FilterProps,
): Promise<Branch[]> {
  const _data = data;

  return _data.filter((item) => {
    if (filter?.name) {
      if (
        !(item?.name?.toLocaleLowerCase() || "").includes(
          filter.name.toLocaleLowerCase(),
        )
      ) {
        return false;
      }
    }

    return true;
  });
}
