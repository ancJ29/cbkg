import { Params } from "@/types/params";
import callApi from "./api";
import { UserRequest } from "@/types";

export async function getAccount(value: Params) {
  const res = await callApi({
    params: value,
    action: "get-users",
  });
  return res;
}
export async function manageUser({
  value,
  action,
}: {
  value: UserRequest;
  action: string;
}) {
  const res = await callApi({
    params: value,
    action: action,
  });
  return {
    status: res.status || 200,
    data: res.data,
    error: res.error,
  };
}
