import { TextInput as TextInputMantine, TextInputProps } from "@mantine/core";
import classes from "./TextInput.module.scss";

type Props = TextInputProps;

const TextInput = ({ ...props }: Props) => {
  return (
    <TextInputMantine
      variant='unstyled'
      classNames={{
        label: classes.label,
        input: classes.input,
      }}
      {...props}
    />
  );
};
export default TextInput;
