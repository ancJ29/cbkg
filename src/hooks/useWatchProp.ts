import { useEffect, useState } from "react";

export default function useWatchProp<T>(
  prop: T,
  callback: () => void,
) {
  const [_prop, setProp] = useState(prop);
  useEffect(() => {
    if (prop === _prop) {
      return;
    }
    callback();
    setProp(prop);
  }, [prop]); // eslint-disable-line react-hooks/exhaustive-deps
}
