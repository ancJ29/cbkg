/* eslint-disable @typescript-eslint/no-explicit-any */
export function uniqueByKey(arr: any[], key: string) {
  return [
    ...new Map(
      arr
        .sort((a, b) => sortByKey(a, b, key))
        .map((item) => [item[key], item]),
    ).values(),
  ];
}

export function sortByKey(a: any, b: any, key: string) {
  return a[key] > b[key] ? -1 : a[key] < b[key] ? 1 : 0;
}
