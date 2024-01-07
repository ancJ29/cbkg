import {
  Box,
  Modal as ModalMantine,
  ModalProps,
} from "@mantine/core";
import classes from "./Modal.module.scss";

interface Props extends ModalProps {
  opened: boolean;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
}
const Modal = ({
  opened,
  onClose,
  children,
  footer,
  ...props
}: Props) => {
  return (
    <ModalMantine
      opened={opened}
      onClose={onClose}
      classNames={{
        title: "font-bold",
      }}
      p={0}
      {...props}
    >
      <Box className="bdr-t" pb={16}></Box>
      <Box className={classes.modal_body}>
        <div className={classes.modal_content}>{children}</div>
        {footer && (
          <div className={classes.modal_footer}>{footer}</div>
        )}
      </Box>
    </ModalMantine>
  );
};
export default Modal;
