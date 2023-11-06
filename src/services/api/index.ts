import useAuthStore from "@/stores/auth.store";
import axios from "axios";

const base = import.meta.env.BASE_URL;

export default async function callApi<T>({
  params,
  action,
  defaultValue,
}: {
  action?: string;
  params?: T;
  defaultValue?: unknown;
}) {
  try {
    const token = useAuthStore.getState().token;
    const res = await axios({
      method: "POST",
      url: base,
      data: { action, params },
      headers: {
        "Content-Type": "application/json",
        "Authorization": token ? `Bearer ${token}` : undefined,
      },
    });
    return res.status < 400 ? res.data : defaultValue || undefined;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Request failed with status code", error);
  }
  return defaultValue || undefined;
}
