export function generateMap<T extends { id: string }>(arr: T[]) {
  return arr.reduce((acc: Record<string, T>, item: T) => {
    item.id && (acc[item.id] = item);
    return acc;
  }, {} as Record<string, T>);
}
