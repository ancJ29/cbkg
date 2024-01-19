export function isUnixTimestamp(value: unknown): boolean {
  if (typeof value !== "number") {
    return false;
  }

  const date = new Date(value * 1000); // Convert to milliseconds
  return date instanceof Date && !isNaN(date.getTime());
}
