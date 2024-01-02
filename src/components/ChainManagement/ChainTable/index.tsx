import Action from "@/components/common/Action";
import SearchBar from "@/components/common/SearchBar";
import Table from "@/components/common/Table";
import useTranslation from "@/hooks/useTranslation";
import useChainStore from "@/stores/chain.store";
import { Chain, FilterProps } from "@/types";
import { Box, Card, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useCallback, useMemo, useState } from "react";
import classes from "./Table.module.scss";
import EditChainForm from "../EditChainForm";

const ChainTable = () => {
  const t = useTranslation();
  const { chains: _chains, deleteChain } = useChainStore();
  const [openedModal, { open: openModal, close: closeModal }] =
    useDisclosure(false);
  const [filter, setFilter] = useState<FilterProps>({});
  const [chain, setChain] = useState<Chain | undefined>();

  const toggleEditModal = useCallback(
    (chain: Chain) => {
      setChain(chain);
      openModal();
    },
    [openModal],
  );

  const chains = useMemo(() => {
    return _chains.filter((item) => {
      if (filter?.name) {
        if (
          !(item?.name?.toLocaleLowerCase() || "").includes(
            filter.name.toLocaleLowerCase(),
          )
        ) {
          return false;
        }
      }

      return true;
    });
  }, [_chains, filter.name]);

  const rows = useMemo(
    () => (
      <>{_rowsBuilder(chains, deleteChain, toggleEditModal, t)}</>
    ),
    [chains, deleteChain, t, toggleEditModal],
  );
  const chainRecords = useMemo(_chainRecords, []);

  return (
    <Card withBorder shadow="md" w="100%">
      <Text fz={16} fw="bold" pb={5} className="bdr-b">
        {t("Chain list")}
      </Text>
      <SearchBar filter={filter} setFilter={setFilter} keys={[]} />
      <Table
        headers={chainRecords}
        dataLength={chains?.length || 0}
        rows={rows}
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
        <EditChainForm chain={chain} onClose={closeModal} />
      </Modal>
    </Card>
  );
};
export default ChainTable;

const _chainRecords = (chain?: Chain) => {
  return [
    {
      style: { flex: 2 },
      label: "Name",
      value: <Text> {chain?.name || "-"}</Text>,
    },
    {
      style: { flex: 1 },
      label: "Quantity",
      value: <Text> {chain?.quantity || 0}</Text>,
    },
  ];
};

function _rowsBuilder(
  chains: Chain[],
  onDelete: (id: string) => void,
  toggleEditModal: (chain: Chain) => void,
  t: (key: string) => string,
) {
  return chains?.map((chain, inx) => (
    <Box key={inx} className={classes.item}>
      {_chainRecords(chain).map(({ label, style, value }, index) => {
        return (
          <Box
            key={index}
            className={classes.itemDetail}
            style={style}
          >
            <Text className={classes.label}>
              {t && t(label || "")}
            </Text>
            {value}
          </Box>
        );
      })}
      <Box className={classes.itemDetail}>
        <Text className={classes.label}></Text>
        <Action
          title={t && t("Confirm")}
          description={`${t && t("Delete chain")} "${chain.name}"`}
          onDelete={() => onDelete(chain.id || "")}
          onEdit={() => toggleEditModal(chain)}
        />
      </Box>
    </Box>
  ));
}
