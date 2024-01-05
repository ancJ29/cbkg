import useMetaDataStore from "@/stores/meta-data.store";
import { Branch, Chain, FilterProps, User } from "@/types";
import callApi from "../api";
import logger from "../logger";

export async function fetchUsers(
  take: number,
  cursor?: string,
): Promise<{ users: User[]; cursor: string }> {
  logger.debug("fetchUsers", take, cursor);
  const res = await callApi({
    action: "get-users",
    params: {
      take,
      cursor,
    },
  });
  if (res.error) {
    return { users: [], cursor: "" };
  }
  const { chainsById, branchesById } = useMetaDataStore.getState();
  const users: User[] = (res.data?.users || []).map((user: User) => {
    if (user.chainIds) {
      user.chains = (user.chainIds || ([] as string[]))
        .map((id: string) => {
          if (chainsById[id]) {
            return chainsById[id];
          }
          return null;
        })
        .filter(Boolean) as Chain[];
    }
    if (user.branchIds) {
      user.branches = (user.branchIds || ([] as string[]))
        .map((id: string) => {
          if (branchesById[id]) {
            return branchesById[id];
          }
          return null;
        })
        .filter(Boolean) as Branch[];
      if (!user.chains?.length) {
        user.chains = (user.branches || [])
          .map((branch: Branch) => {
            if (branch?.chainId && chainsById[branch?.chainId]) {
              return chainsById[branch?.chainId];
            }
            return null;
          })
          .filter(Boolean) as Chain[];
      }
    }
    // TODO: refactor this...
    user.chainIds = user.chains?.map((chain) => chain.id) || [];
    user.branchIds = user.branches?.map((branch) => branch.id) || [];
    return user;
  });
  return { users, cursor: res.data?.cursor || "" };
}

export async function getUsers(
  data: User[],
  chains?: Chain[],
  branches?: Branch[],
  filter?: FilterProps,
): Promise<User[]> {
  const filteredData = data.filter((item) => {
    if (filter?.active !== undefined) {
      if (filter.active !== item?.active) {
        return false;
      }
    }
    if (
      filter?.chainId &&
      item.chains &&
      !objectToArray(item.chains)?.includes(filter.chainId)
    ) {
      return false;
    }
    if (
      filter?.branchId &&
      item.branches &&
      !objectToArray(item.branches)?.includes(filter.branchId)
    ) {
      return false;
    }
    if (filter?.name) {
      const keyword = filter.name;
      const fullName = item?.fullName || "";
      const phone = item?.name || "";
      if (!fullName.includes(keyword) && !phone.includes(keyword)) {
        return false;
      }
    }

    return true;
  });

  return filteredData.map((user) => {
    const branch = chains?.find((branch) =>
      user.branchIds?.includes(branch.id),
    );
    const chain = branches?.find((chain) =>
      user.chainIds?.includes(chain.id),
    );

    return {
      ...user,
      chain: chain ? { id: chain.id, name: chain.name } : undefined,
      branch: branch
        ? { id: branch.id, name: branch.name }
        : undefined,
    } as User;
  });
}

function objectToArray<T extends { id: string }>(
  data: T[],
): string[] {
  return data.map((item) => item.id);
}
