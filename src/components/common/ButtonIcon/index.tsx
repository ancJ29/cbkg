import { ButtonProps, Button as MantineButton } from "@mantine/core";
import classes from "./ButtonIcon.module.scss";

interface ButtonIconProps extends ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const ButtonIcon = ({
  children,
  onClick,
  ...props
}: ButtonIconProps) => {
  return (
    <MantineButton
      p={0}
      h={40}
      w={40}
      radius={999}
      className={classes.container}
      onClick={onClick}
      {...props}
    >
      {children}
    </MantineButton>
  );
};
export default ButtonIcon;
