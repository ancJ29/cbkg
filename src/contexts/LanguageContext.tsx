import { dictionaryList } from "@/services/i18n";
import { ReactNode, createContext, useState } from "react";

interface LanguageProviderProps {
  children: ReactNode;
}

export interface LanguageContextType {
  language: string;
  dictionary: Record<string, string>;
  onChangeLanguage?: (selected: string) => void;
}

export const LanguageContext = createContext<LanguageContextType>({
  language: "vi",
  dictionary: dictionaryList.vi,
});

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState("vi");

  const provider: LanguageContextType = {
    language,
    dictionary: dictionaryList[language],
    onChangeLanguage: setLanguage,
  };

  return <LanguageContext.Provider value={provider}>{children}</LanguageContext.Provider>;
}
