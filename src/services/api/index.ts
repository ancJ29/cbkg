import logger from "@/services/logger";
import useAuthStore from "@/stores/auth.store";
import axios, { type AxiosResponse } from "axios";
import dayjs from "dayjs";
import { LRUCache } from "lru-cache";
import { toast } from "react-toastify";

type GenericObject = {
  [key: string]: unknown;
};

type callApiProps<T> = {
  params?: T;
  action: string;
  options?: {
    noCache?: boolean;
    noLoading?: boolean;
    forceReload?: boolean;
    showToastMessage?: boolean;
    toastMessage?: string;
  };
};

const base = import.meta.env.BASE_URL;

let counter = 0;

const cache = new LRUCache<string, GenericObject>({
  max: 100,
  maxSize: 1000,
  sizeCalculation: () => 1,
  ttl: 1000 * 60, // one minute
});

export default async function callApi<T, R>({
  params,
  action,
  options = {},
}: callApiProps<T>) {
  let key = "";
  if (!options?.noCache) {
    if (action.startsWith("get-")) {
      const cache = _checkCache<R>(
        action,
        params,
        options?.forceReload,
      );
      key = cache.key;
      if (cache.data) {
        logger.debug("[api-v2-cache-hit]", key, action, params);
        return cache.data;
      }
    }
  }
  !options?.noLoading && _increaseCounter();
  const start = Date.now();
  try {
    const data = await _fetch<R>(action, params);
    options?.showToastMessage &&
      toast(options.toastMessage || "Successfully");
    key && cache.set(key, data as GenericObject);
    logger.debug("[api-v2-success]", key, action, params, data);
    return data;
  } catch (error) {
    options?.showToastMessage && toast("Unknown error");
    logger.error("[api-v2-error]", error);
  } finally {
    _decreaseCounter(start);
  }
  return undefined;
}

function _key<T>(action?: string, params?: T) {
  const ONE_MINUTE = 60000;
  const now = Date.now();
  return btoa(
    `${now - (now % ONE_MINUTE)}.${action}.${JSON.stringify(
      params || {},
    )}`,
  );
}

function _fromCache<R>(key: string) {
  if (cache.has(key)) {
    return cache.get(key) as R;
  }
  return undefined;
}

function _checkCache<R>(
  action: string,
  params: unknown,
  forceReload?: boolean,
) {
  const key = _key(action, params);
  logger.debug("[api-v2-cache]", key, { action, params });
  if (forceReload) {
    cache.delete(key);
    return { key };
  }
  const data = _fromCache<R>(key);
  if (data) {
    return { key, data };
  }
  return { key };
}

async function _decreaseCounter(start: number) {
  const THRESHOLD = 800;
  const delay = Math.max(THRESHOLD - (Date.now() - start), 0);
  if (delay > 0) {
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
  counter--;
  if (counter < 1) {
    window.dispatchEvent(new Event("clear-loading"));
  }
}

async function _increaseCounter() {
  counter < 1 && window.dispatchEvent(new Event("start-loading"));
  counter++;
}

async function _fetch<R>(action: string, params: unknown) {
  const token = useAuthStore.getState().token;
  const res = await axios<unknown, AxiosResponse<R>>({
    method: "POST",
    url: base,
    data: { action, params: parseDateToUnix(params) },
    headers: {
      "Content-Type": "application/json",
      "Authorization": token ? `Bearer ${token}` : undefined,
      "x-unix-timestamp": "true",
    },
  });
  return res.data;
}

export function parseDateToUnix(input: unknown): unknown {
  if (dayjs.isDayjs(input)) {
    return input.unix() * 1e3;
  } else if (input instanceof Date) {
    return input.getTime();
  } else if (typeof input === "string") {
    const date = new Date(input);
    if (date.toString() !== "Invalid Date") {
      return date.getTime();
    }
    return input;
  } else if (Array.isArray(input)) {
    return input.map(parseDateToUnix);
  } else if (typeof input === "object" && input !== null) {
    return Object.fromEntries(
      Object.entries(
        input as { [s: string]: unknown } | ArrayLike<unknown>,
      ).map(([key, value]) => [key, parseDateToUnix(value)]),
    );
  } else {
    return input;
  }
}
