import { formatPhoneNumber } from "@/utils";
import {
  Box,
  TextInput as MantineTextInput,
  TextInputProps as MantineTextInputProps,
} from "@mantine/core";
import { ChangeEvent, useCallback, useState } from "react";
import classes from "./PhoneInput.module.scss";
import useWatchProp from "@/hooks/useWatchProp";

interface PhoneInputProps extends MantineTextInputProps {
  value?: string;
  placeholder: string;
  className?: string;
  onChangeValue?: (_: string) => void;
  onEnter?: (_: string) => void;
  label?: string;
  labelClassName?: string;
}

const PhoneInput = ({
  value,
  placeholder,
  className,
  label,
  labelClassName,
  onEnter,
  onChangeValue,
  ...props
}: PhoneInputProps) => {
  const [_value, setValue] = useState(formatPhoneNumber(value || ""));

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Enter" && onEnter) {
      e.preventDefault();
      e.stopPropagation();
      onEnter(_value);
    }
  };

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = formatPhoneNumber(
        e?.target.value.replace(/\D/g, ""),
      );
      setValue(value);
      onChangeValue && onChangeValue(value);
    },
    [onChangeValue],
  );

  useWatchProp(value, () => value === undefined && setValue(""));

  return (
    <Box className={className}>
      <MantineTextInput
        variant="unstyled"
        value={_value || ""}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        label={label}
        placeholder={placeholder}
        classNames={{
          label: ` ${labelClassName || ""} ${classes.label}`,
          input: classes.input,
        }}
        {...props}
      />
    </Box>
  );
};

export default PhoneInput;
