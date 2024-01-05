import { Box } from "@mantine/core";
import TextInput from "../TextInput";
import { ChangeEvent } from "react";
import { formatPhoneNumber } from "@/utils";
interface Props {
  value?: string;
  placeholder: string;
  className?: string;
  onChange: (e: string) => void;
  label?: string;
  labelClassName?: string;
}
const PhoneInput = ({
  value,
  placeholder,
  className,
  onChange,
  label,
  labelClassName,
}: Props) => {
  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e?.target.value.replace(/\D/g, "");
    const formattedNumber = formatPhoneNumber(input);
    onChange(formattedNumber);
  };

  return (
    <Box className={className}>
      <TextInput
        labelClassName={labelClassName}
        label={label}
        placeholder={placeholder}
        value={value}
        onChange={(e) => handlePhoneChange(e)}
      />
    </Box>
  );
};

export default PhoneInput;
