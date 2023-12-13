import { TextInputProps } from "@mantine/core";
import { useState } from "react";
import TextInput from "../TextInput";

const PhoneInput = ({
  value,
  placeholder,
  className,
}: TextInputProps) => {
  const [internalValue, setInternalValue] = useState(value);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const inputValue = event.target.value.replace(/[^0-9.]/g, "");
    if (!/[^0-9.]/.test(inputValue)) {
      event.preventDefault();
    }
    let formattedValue = inputValue;
    if (inputValue.length <= 3) {
      formattedValue = inputValue;
    } else if (inputValue.length <= 7) {
      formattedValue = `${inputValue.slice(0, 3)} ${inputValue.slice(
        3,
      )}`;
    } else {
      formattedValue = `${inputValue.slice(0, 3)} ${inputValue.slice(
        3,
        7,
      )} ${inputValue.slice(7)}`;
    }
    formattedValue = formattedValue.slice(0, 13);
    setInternalValue(formattedValue);
  };

  return (
    <TextInput
      value={internalValue}
      onChange={handleInputChange}
      placeholder={placeholder}
      className={className}
    />
  );
};

export default PhoneInput;
