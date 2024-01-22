import { Flex } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import ButtonIcon from "../ButtonIcon";
import ConfirmPopup from "../ConfirmPopup";
import { useDisclosure } from "@mantine/hooks";

type Props = {
  title?: string;
  description?: string;
  justify?: string;
  onDelete?: () => void;
  onEdit?: () => void;
  disable?: boolean;
};
const Action = ({
  title,
  description,
  justify,
  onDelete,
  onEdit,
  disable,
}: Props) => {
  const [open, { close: close, open: openModal }] =
    useDisclosure(false);
  return (
    <Flex justify={justify || "end"} opacity={disable ? 0.6 : 1}>
      <ButtonIcon onClick={openModal} disabled={disable}>
        <IconTrash strokeWidth="1.5" color="black" />
      </ButtonIcon>
      <ButtonIcon onClick={onEdit} disabled={disable}>
        <IconEdit strokeWidth="1.5" color="black" />
      </ButtonIcon>
      <ConfirmPopup
        title={title}
        description={description}
        open={open}
        onClose={close}
        onSave={onDelete}
        action="Delete"
      />
    </Flex>
  );
};
export default Action;
