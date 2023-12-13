import {
  TextInput as TextInputMantine,
  TextInputProps,
} from "@mantine/core";
import classes from "./TextInput.module.scss";
interface Props extends TextInputProps {
  onEnter?: () => void;
  value?: string | readonly string[] | number | undefined;
}

const TextInput = ({ value, onEnter, ...props }: Props) => {
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Enter" && onEnter) {
      e.preventDefault();
      e.stopPropagation();
      onEnter();
    }
  };
  return (
    <TextInputMantine
      variant="unstyled"
      value={value || ""}
      onKeyDown={onEnter ? handleKeyDown : undefined}
      classNames={{
        label: classes.label,
        input: classes.input,
      }}
      {...props}
    />
  );
};
export default TextInput;
