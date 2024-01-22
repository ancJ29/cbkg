import {
  TextInput as MantineTextInput,
  TextInputProps as MantineTextInputProps,
} from "@mantine/core";
import { ChangeEvent, useCallback, useState } from "react";
import classes from "./TextInput.module.scss";
import useWatchProp from "@/hooks/useWatchProp";

interface TextInputProps extends MantineTextInputProps {
  onEnter?: (_?: string | number) => void;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value?: string | number;
  labelClassName?: string;
}

const TextInput = ({
  value,
  onEnter,
  onChange,
  labelClassName,
  ...props
}: TextInputProps) => {
  const [_value, setValue] = useState<string | number | undefined>(
    value,
  );

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
      onChange && onChange(e);
      setValue(e.target.value);
    },
    [onChange],
  );

  useWatchProp(value, () => setValue(value));

  return (
    <MantineTextInput
      variant="unstyled"
      value={_value}
      onKeyDown={handleKeyDown}
      onChange={handleChange}
      classNames={{
        label: ` ${labelClassName || ""} ${classes.label}`,
        input: classes.input,
      }}
      {...props}
    />
  );
};

export default TextInput;
