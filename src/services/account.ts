import {
  Branch,
  Chain,
  FilterProps,
  User,
  UserRequest,
} from "@/types";

export async function getUsers(
  data: UserRequest[],
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
      !filter?.chainId.includes(item?.chainId as string)
    ) {
      return false;
    }
    if (
      filter?.branchId &&
      !filter?.branchId.includes(item?.branchIds as string)
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
    const branch = chains?.find(
      (branch) => branch.id === user?.branchIds,
    );
    const chain = branches?.find(
      (chain) => chain.id === user?.chainId,
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
