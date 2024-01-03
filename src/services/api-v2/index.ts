import logger from "@/services/logger";
import useAuthStore from "@/stores/auth.store";
import useCommonStore from "@/stores/common.store";
import axios, { type AxiosResponse } from "axios";

const base = import.meta.env.BASE_URL;

type callApiProps<T> = {
  params?: T;
  action?: string;
  options?: {
    noLoading?: boolean;
  };
};

export default async function callApiV2<T, Res>({
  params,
  action,
  options,
}: callApiProps<T>) {
  const { increaseLoadingCounter, decreaseLoadingCounter } =
    useCommonStore.getState();

  try {
    !options?.noLoading && increaseLoadingCounter();
    const token = useAuthStore.getState().token;
    const res = await axios<unknown, AxiosResponse<Res>>({
      method: "POST",
      url: base,
      data: { action, params },
      headers: {
        "Content-Type": "application/json",
        "Authorization": token ? `Bearer ${token}` : undefined,
      },
    });
    return res.data;
  } catch (error: unknown) {
    logger.error("[api-v2-error]", error);
  } finally {
    !options?.noLoading && decreaseLoadingCounter();
  }

  return undefined;
}
