export function uniqueByKey<T, K extends keyof T>(
  arr: T[],
  key: string,
) {
  return [
    ...new Map(
      arr
        .filter((item) => item[key as K]) // skip invalid items
        .map((item) => [item[key as K], item]),
    ).values(),
  ];
}

export function sortByKey<T, K extends keyof T>(arr: T[], key: K) {
  return arr.sort((a, b) => {
    if (a[key] > b[key]) {
      return 1;
    }
    if (a[key] < b[key]) {
      return 1;
    }
    return 0;
  });
}

export function buildOption<T extends { id?: string; name?: string }>(
  data: T[],
) {
  return data.map((item, index) => ({
    value: item.id || index.toString(),
    label: item.name || "",
  }));
}

export function getCursor<T extends Record<string, unknown>>(
  arr: T[],
  key = "id",
): string {
  if (!arr.length) {
    return "";
  }
  const last = arr[arr.length - 1];
  if (key in last && typeof last[key] === "string") {
    return (last[key] || "") as string;
  }
  return "";
}
