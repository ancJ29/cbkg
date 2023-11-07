import { useCallback, useState } from "react";

export default function useToggle(initState: boolean): [boolean, (value?: boolean) => void] {
  const [open, setOpen] = useState(initState);
  const toggle = useCallback((value?: boolean) => setOpen(value === true ? true : !open), [open]);
  return [open, toggle];
}
