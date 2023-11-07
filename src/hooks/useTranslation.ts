import { LanguageContext } from "@/contexts/LanguageContext";
import { useCallback, useContext } from "react";

export default function useTranslation(): (key: string) => string {
  const { dictionary } = useContext(LanguageContext);
  const t = useCallback(
    (key: string) => {
      if (dictionary[key]) {
        return dictionary[key];
      } else {
        // eslint-disable-next-line no-console
        console.warn("Missing translation", key);
        return key;
      }
    },
    [dictionary],
  );
  return t;
}
