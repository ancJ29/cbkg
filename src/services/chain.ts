import { Chain, FilterProps, Params } from "@/types";
import { ApiResponse } from "@/types/common/api";
import callApi from "./api";

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

export async function getChains(
  data: Chain[],
  filter?: FilterProps,
): Promise<Chain[]> {
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
