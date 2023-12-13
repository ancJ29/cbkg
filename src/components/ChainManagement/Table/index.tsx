import useTranslation from "@/hooks/useTranslation";
import { Card, Box, Text, Modal } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useCallback, useState } from "react";
import { Chain } from "@/types";
import classes from "./Table.module.scss";
import TextInput from "@/components/common/TextInput";
import Action from "@/components/common/Action";
import useChainStore from "@/stores/chain.store";
import { useDisclosure } from "@mantine/hooks";
import Form from "../Form";
import Table from "@/components/common/Table";
import { FilterProps, getChains } from "@/services";
import useWatchProp from "@/hooks/useWatchProp";
import useOnMounted from "@/hooks/useOnMounted";

const ChainTable = () => {
  const t = useTranslation();
  const { chains, deleteChain, editChain } = useChainStore();
  const [name, setName] = useState("");
  const [openedModal, { open: openModal, close: closeModal }] =
    useDisclosure(false);
  const [chain, setChain] = useState<Chain>();
  const [data, setData] = useState<Chain[]>();
  const [filter, setFilter] = useState<FilterProps>({});

  const fetchData = useCallback(async () => {
    const _data = getChains(chains, filter);
    setData(await _data);
  }, [chains, filter]);

  const onEdit = useCallback(
    async (value: Chain) => {
      editChain(value);
      closeModal();
    },
    [closeModal, editChain],
  );

  useWatchProp(filter, () => fetchData());

  useWatchProp(chains, () => fetchData());

  useOnMounted(
    useCallback(() => {
      fetchData();
    }, [fetchData]),
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
            setFilter({ ...filter, name: name });
          }}
        />
      </Box>
      <Table
        headers={headers}
        dataLength={data?.length || 0}
        rows={rows(data, deleteChain, openModal, setChain, t)}
        hasMore={false}
      />
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
  elements?: Chain[],
  onDelete?: (id: string) => void,
  openModal?: () => void,
  setChain?: (value: Chain) => void,
  t?: (key: string) => string,
) => {
  return elements?.map((element) => (
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
