import { useEffect } from "react";
import { useIsMounted } from "usehooks-ts";

export default function useOnMounted(callback: () => void) {
  const isMounted = useIsMounted();
  useEffect(() => {
    if (isMounted()) {
      callback();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted]);
}
