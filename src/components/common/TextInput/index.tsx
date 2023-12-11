import {
  TextInput as TextInputMantine,
  TextInputProps,
} from "@mantine/core";
import classes from "./TextInput.module.scss";
interface Props extends TextInputProps {
  onEnter?: () => void;
}

const TextInput = ({ onEnter, ...props }: Props) => {
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
      classNames={{
        label: classes.label,
        input: classes.input,
      }}
      onKeyDown={onEnter ? handleKeyDown : undefined}
      {...props}
    />
  );
};
export default TextInput;
