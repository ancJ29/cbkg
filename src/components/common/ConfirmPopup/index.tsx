import useTranslation from "@/hooks/useTranslation";
import { Button, Flex, Modal, Text } from "@mantine/core";

type ConfirmPopupProps = {
  title?: string;
  description?: string;
  open: boolean;
  onClose: () => void;
  onSave?: () => void;
  action?: string;
};

const ConfirmPopup = ({
  description,
  open,
  title,
  onClose,
  onSave,
  action,
}: ConfirmPopupProps) => {
  const t = useTranslation();
  return (
    <Modal
      opened={open}
      onClose={onClose}
      title={title || ""}
      centered
      size="sm"
      classNames={{ title: "font-bold justify-center w-full flex" }}
    >
      <Text>{description || ""}</Text>
      <Flex gap={10} mt={10} justify="end">
        <Button
          h="2rem"
          w="6rem"
          variant="outline"
          radius={6}
          onClick={onClose}
        >
          {t("Cancel")}
        </Button>
        <Button
          h="2rem"
          w="6rem"
          radius={6}
          onClick={() => {
            onSave && onSave();
            onClose();
          }}
        >
          {t(action || "Save")}
        </Button>
      </Flex>
    </Modal>
  );
};
export default ConfirmPopup;
