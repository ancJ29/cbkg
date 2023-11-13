import { useCallback, useState } from "react";

export default function useToggle(
  initState?: boolean,
): [boolean, (value?: boolean) => void] {
  const [open, setOpen] = useState(initState ?? false);
  const toggle = useCallback(
    (value?: boolean) => setOpen(value ?? !open),
    [open],
  );
  return [open, toggle];
}
