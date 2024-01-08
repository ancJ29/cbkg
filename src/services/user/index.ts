import useMetaDataStore from "@/stores/meta-data.store";
import { Branch, Chain, User } from "@/types";
import callApi from "../api";
import logger from "../logger";

export async function fetchUsers(
  take: number,
  cursor?: string,
  forceReload?: boolean,
): Promise<{ users: User[]; cursor: string }> {
  logger.debug("fetchUsers", take, cursor);
  // prettier-ignore
  const res = await callApi<unknown, { users: User[]; cursor: string; }>({
    action: "get-users",
    params: {
      take,
      cursor,
    },
    options: {
      forceReload: forceReload || false,
    },
  });
  if (!res) {
    return { users: [], cursor: "" };
  }
  const { chainsById, branchesById } = useMetaDataStore.getState();
  const users: User[] = (res.users || []).map((user: User) => {
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
  return { users, cursor: res?.cursor || "" };
}
