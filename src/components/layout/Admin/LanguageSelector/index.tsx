import { LanguageContext } from "@/contexts/LanguageContext";
import { languageOptions } from "@/services/i18n";
import { Select } from "@mantine/core";
import { useContext } from "react";

const LanguageSelector = () => {
  const { language, onChangeLanguage } = useContext(LanguageContext);
  const handleLanguageChange = (value: string | null) => {
    onChangeLanguage && onChangeLanguage(value || "vi");
  };
  return (
    <div>
      <Select
        onChange={handleLanguageChange}
        value={language}
        data={Object.entries(languageOptions).map(([id, name]) => ({
          value: id,
          label: name,
        }))}
        checkIconPosition={"right"}
        width={"100px"}
      />
    </div>
  );
};
export default LanguageSelector;
