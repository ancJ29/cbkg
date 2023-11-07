import { LanguageContext } from "@/contexts/LanguageContext";
import { languageOptions } from "@/services/i18n";
import { ChangeEvent, useContext } from "react";
const LanguageSelector = () => {
  const { language, onChangeLanguage } = useContext(LanguageContext);
  const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChangeLanguage && onChangeLanguage(e.target.value);
  };

  return (
    <select onChange={handleLanguageChange} value={language}>
      {Object.entries(languageOptions).map(([id, name]) => (
        <option key={id} value={id}>
          {name}
        </option>
      ))}
    </select>
  );
};
export default LanguageSelector;
