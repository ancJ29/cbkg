import { LanguageContext } from "@/contexts/LanguageContext";
import { languageOptions } from "@/services/i18n";
import { Select } from "@mantine/core";
import { useContext } from "react";
import { isMobile } from "react-device-detect";

const LanguageSelector = () => {
  const { language, onChangeLanguage } = useContext(LanguageContext);
  const handleLanguageChange = (value: string | null) => {
    onChangeLanguage && onChangeLanguage(value || "vi");
  };
  return (
    <Select
      onChange={handleLanguageChange}
      value={language}
      data={Object.entries(languageOptions).map(([id, name]) => ({
        value: id,
        label: isMobile ? id.toLocaleUpperCase() : name,
      }))}
      checkIconPosition={"right"}
      width={"100px"}
    />
  );
};
export default LanguageSelector;
