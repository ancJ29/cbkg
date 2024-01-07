import { formatPhoneNumber } from "@/utils";
import { Box } from "@mantine/core";
import { ChangeEvent, useState } from "react";
import TextInput from "../TextInput";

interface Props {
  value?: string;
  placeholder: string;
  className?: string;
  onChange?: (_: string) => void;
  onEnter?: (_: string) => void;
  label?: string;
  labelClassName?: string;
}

const PhoneInput = ({
  value,
  placeholder,
  className,
  onChange,
  onEnter,
  label,
  labelClassName,
}: Props) => {
  const [_value, setValue] = useState(formatPhoneNumber(value || ""));
  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = formatPhoneNumber(
      e?.target.value.replace(/\D/g, ""),
    );
    setValue(value);
    onChange && onChange(value);
  };

  return (
    <Box className={className}>
      <TextInput
        onEnter={() => onEnter && onEnter(_value)}
        labelClassName={labelClassName}
        label={label}
        placeholder={placeholder}
        value={_value}
        onChange={(e) => handlePhoneChange(e)}
      />
    </Box>
  );
};

export default PhoneInput;
