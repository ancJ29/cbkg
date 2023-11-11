import useTranslation from "@/hooks/useTranslation";
import { Box, Center } from "@mantine/core";

const StoreManagement = () => {
  const t = useTranslation();
  return (
    <Center bg="gray.1" w="100%" h="100%">
      <Box w={"30vw"} ta={"center"}>
        {t("Store Management")}
      </Box>
    </Center>
  );
};

export default StoreManagement;
