import useTranslation from "@/hooks/useTranslation";
import { Card, Box, Text, Modal } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useCallback, useState } from "react";
import { Chain } from "@/types";
import classes from "./Table.module.scss";
import TextInput from "@/components/common/TextInput";
import Action from "@/components/common/Action";
import Scroll from "@/components/common/Scroll";
import useChainStore from "@/stores/chain.store";
import logger from "@/services/logger";
import { TAKE } from "@/configs/constants";
import { useDisclosure } from "@mantine/hooks";
import Form from "../Form";

const ChainTable = () => {
  const t = useTranslation();
  const {
    chains: data,
    setChains,
    deleteChain,
    editChain,
  } = useChainStore();
  const [hasMore, setHasMore] = useState(true);
  const [name, setName] = useState("");
  const [openedModal, { open: openModal, close: closeModal }] =
    useDisclosure(false);
  const [chain, setChain] = useState<Chain>();

  const fetchData = useCallback(
    async (search?: boolean) => {
      if (data.length % TAKE >= TAKE || data.length % TAKE === 0) {
        setChains(name, search);
      } else {
        setHasMore(false);
        logger.warn("No more chains to fetch.");
      }
    },
    [data.length, name, setChains],
  );
  const handleScroll = () => {
    fetchData();
  };

  const onDelete = async (id: string) => {
    deleteChain(id);
  };

  const onEdit = useCallback(
    async (value: Chain) => {
      editChain(value);
      closeModal();
    },
    [closeModal, editChain],
  );

  return (
    <Card withBorder shadow="md" w="100%">
      <Text fz={16} fw="bold" pb={5} className="bdr-b">
        {t("Chain list")}
      </Text>
      <Box mt={10} className={classes.container}>
        <div></div>
        <TextInput
          value={name}
          placeholder={t("Search by name")}
          onChange={(e) => setName(e.target.value)}
          rightSection={<IconSearch />}
          onEnter={() => {
            fetchData(true);
          }}
        />
      </Box>
      <Card withBorder p={0} radius={8} mt={20}>
        <Box className={classes.header}>
          {headers?.map((header, index) => (
            <Box key={index} style={{ flex: 2 }}>
              {t(header)}
            </Box>
          ))}
          <Box style={{ flex: 1 }}>&nbsp;</Box>
        </Box>
        <Scroll
          dataLength={data.length}
          hasMore={hasMore}
          handleScroll={handleScroll}
          rows={rows(data, onDelete, openModal, setChain, t)}
        />
      </Card>
      <Modal
        opened={openedModal}
        onClose={closeModal}
        title={t("Edit Chain")}
        centered
        size="lg"
        classNames={{ title: "font-bold" }}
      >
        <div className="bdr-t"></div>
        <Form chain={chain} onSave={onEdit} action="edit" />
      </Modal>
    </Card>
  );
};
export default ChainTable;
const headers = ["ID", "Name"];

const rows = (
  elements: Chain[],
  onDelete?: (id: string) => void,
  openModal?: () => void,
  setChain?: (value: Chain) => void,
  t?: (key: string) => string,
) => {
  return elements.map((element) => (
    <Box key={element.id} className={classes.item}>
      <Box className={classes.itemDetail}>
        <Text className={classes.label}>
          {t && t(headers[0] || "")}
        </Text>
        <Text>{element.id || "-"}</Text>
      </Box>
      <Box className={classes.itemDetail}>
        <Text className={classes.label}>
          {t && t(headers[1] || "")}
        </Text>
        <Text>{element.name || "-"}</Text>
      </Box>
      <Box className={classes.itemDetail} style={{ flex: 1 }}>
        <Text className={classes.label}></Text>
        <Action
          title={t && t("Confirm")}
          description={
            // eslint-disable-next-line quotes
            t && t("Delete chain") + ' "' + element.name + '"'
          }
          onDelete={() => onDelete && onDelete(element.id as string)}
          onEdit={() => {
            openModal && openModal();
            setChain && setChain(element);
          }}
        />
      </Box>
    </Box>
  ));
};
