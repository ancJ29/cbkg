// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function uniqueByKey(arr: any[], key: string) {
  return [...new Map(arr.map((item) => [item[key], item])).values()];
}
