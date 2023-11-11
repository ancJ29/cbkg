import {
  PasswordInput as PasswordInputMantine,
  PasswordInputProps,
} from "@mantine/core";
import classes from "./PasswordInput.module.scss";

const PasswordInput = ({ ...props }: PasswordInputProps) => {
  return (
    <PasswordInputMantine
      variant="unstyled"
      classNames={{
        label: classes.label,
        innerInput: classes.innerInput,
        input: classes.input,
      }}
      {...props}
    />
  );
};
export default PasswordInput;
