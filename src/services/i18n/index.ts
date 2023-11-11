import en from "./lang/en.json";
import vi from "./lang/vi.json";

type Dictionary = Record<string, string>;

export const dictionaryList: Record<string, Dictionary> = {
  en,
  vi,
};

export const languageOptions = {
  en: "English",
  /* cspell:disable-next-line */
  vi: "Tiếng Việt",
};
