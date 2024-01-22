import Action from "@/components/common/Action";
import Table from "@/components/common/FlexTable";
import SearchBar from "@/components/common/SearchBar";
import useToggleEditModal from "@/hooks/useToggleEditModal";
import useTranslation from "@/hooks/useTranslation";
import { Chain, FilterProps } from "@/types";
import { Box, Card, Modal, Text } from "@mantine/core";
import { useMemo, useState } from "react";
import EditChainForm from "../EditChainForm";
import classes from "./Table.module.scss";

type ChainTableProps = {
  chains: Chain[];
  deleteChain: (id: string) => void;
  updateChain: (chain: Chain) => Promise<string>;
};

const ChainTable = ({
  chains,
  deleteChain,
  updateChain,
}: ChainTableProps) => {
  const t = useTranslation();
  const [filter, setFilter] = useState<FilterProps>({});
  const {
    close,
    opened,
    record: chain,
    toggleEditModal,
  } = useToggleEditModal<Chain>();

  const data = useMemo(() => {
    const keyword = filter.keyword?.toLocaleLowerCase() || "";
    return chains.filter((chain) => {
      if (keyword) {
        return chain.name.toLocaleLowerCase().includes(keyword);
      }
      return true;
    });
  }, [chains, filter.keyword]);

  const rows = useMemo(
    () => <>{_rowsBuilder(data, deleteChain, toggleEditModal, t)}</>,
    [data, deleteChain, t, toggleEditModal],
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
        dataLength={data?.length || 0}
        rows={rows}
      />
      <Modal
        opened={opened}
        onClose={close}
        title={t("Edit Chain")}
        centered
        size="lg"
        classNames={{ title: "font-bold" }}
      >
        <div className="bdr-t"></div>
        <EditChainForm
          chain={chain}
          onClose={close}
          updateChain={updateChain}
        />
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
      value: chain ? <Text> {chain.name || "-"}</Text> : "",
    },
    {
      style: { flex: 1 },
      label: "Quantity",
      value: chain ? <Text> {chain.totalBranches || 0}</Text> : "",
    },
  ];
};

// TODO @ndyenchi: move this block utils or helpers
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
            <Text className={classes.label}>{t(label || "")}</Text>
            {value}
          </Box>
        );
      })}
      {/* TODO @ndyenchi: move this block to separate component */}
      <Box className={classes.itemDetail}>
        <Text className={classes.label}></Text>
        <Action
          title={t("Confirm")}
          description={`${t("Delete chain")} "${chain.name}"`}
          onDelete={() => onDelete(chain.id || "")}
          onEdit={() => toggleEditModal(chain)}
        />
      </Box>
    </Box>
  ));
}
