import { Box } from "@mantine/core";
import TextInput from "../TextInput";
import { ChangeEvent } from "react";
interface Props {
  value?: string;
  placeholder: string;
  className: string;
  onChange: (e: string) => void;
}
const PhoneInput = ({
  value,
  placeholder,
  className,
  onChange,
}: Props) => {
  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e?.target.value.replace(/\D/g, "");
    const formattedNumber = formatPhoneNumber(input);
    onChange(formattedNumber);
  };

  const formatPhoneNumber = (input: string) => {
    const cleaned = ("" + input).replace(/\D/g, "");
    let formattedNumber = "";

    if (/((^(\+84|84|0|0084){1})(2))+([0-9]{9})$/.test(cleaned)) {
      formattedNumber = cleaned.replace(
        /^(\+84|84|0|0084)(2)(\d{2})(\d{4})(\d{3})$/,
        "02$3 $4 $5",
      );
    } else if (
      /((^(\+84|84|0|0084){1})(3|5|7|8|9))+([0-9]{8})$/.test(cleaned)
    ) {
      formattedNumber = cleaned.replace(
        /^(\+84|84|0|0084)(\d{2})([35789])(\d{3})(\d{3})$/,
        "0$2$3 $4 $5",
      );
    } else {
      formattedNumber = cleaned;
    }

    return formattedNumber;
  };

  return (
    <Box className={className}>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChange={(e) => handlePhoneChange(e)}
      />
    </Box>
  );
};

export default PhoneInput;
