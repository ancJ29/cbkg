import Action from "@/components/common/Action";
import Table from "@/components/common/FlexTable";
import SearchBar from "@/components/common/SearchBar";
import useToggleEditModal from "@/hooks/useToggleEditModal";
import useTranslation from "@/hooks/useTranslation";
import useMetaDataStore from "@/stores/meta-data.store";
import { Branch, FilterProps } from "@/types";
import { formatPhoneNumber } from "@/utils";
import { Box, Card, Modal, Text } from "@mantine/core";
import cls from "classnames";
import { useCallback, useMemo, useState } from "react";
import EditBranchForm from "../EditBranchForm";
import classes from "./Table.module.scss";

type BranchTableProps = {
  branches: Branch[];
  updateBranch: (branch: Branch) => Promise<string>;
  deleteBranch: (id: string) => void;
};
const BranchTable = ({
  branches,
  updateBranch,
  deleteBranch,
}: BranchTableProps) => {
  const t = useTranslation();
  const { defaultChainId, defaultBranchId } = useMetaDataStore();
  const [filter, setFilter] = useState<FilterProps>({
    branchId: defaultBranchId,
    chainId: defaultChainId,
  });
  const {
    close,
    opened,
    record: branch,
    toggleEditModal,
  } = useToggleEditModal<Branch>();

  const data = useMemo(() => {
    const keyword = filter.keyword?.toLocaleLowerCase() || "";
    return branches.filter((branch) => {
      if (filter?.chainId) {
        if (!filter.chainId.includes(branch.chainId)) {
          return false;
        }
      }
      if (keyword) {
        const name = branch?.name?.toLocaleLowerCase() || "";
        return name.includes(keyword);
      }
      return true;
    });
  }, [branches, filter]);

  const rows = useMemo(
    () => <>{_rowsBuilder(data, deleteBranch, toggleEditModal, t)}</>,
    [deleteBranch, t, toggleEditModal, data],
  );

  const branchRecords = useMemo(_branchRecords, []);

  const _updateBranch = useCallback(
    async (branch: Branch) => {
      const result = await updateBranch(branch);
      close();
      return result;
    },
    [close, updateBranch],
  );

  return (
    <Card withBorder shadow="md" w="100%">
      <Text fz={16} fw="bold" pb={5} className="bdr-b">
        {t("Branches List")}
      </Text>
      <SearchBar
        filter={filter}
        setFilter={setFilter}
        keys={["CHAIN_OPTIONS"]}
      />
      <Table
        headers={branchRecords}
        dataLength={branches.length}
        rows={rows}
        headerClassName={cls(classes.header, classes.item)}
        tableWrapperClassName={classes.tableWrapper}
      />
      <Modal
        opened={opened}
        onClose={close}
        title={t("Edit Branch")}
        centered
        size="lg"
        classNames={{ title: "font-bold" }}
      >
        <div className="bdr-t"></div>
        <EditBranchForm
          updateBranch={_updateBranch}
          branch={branch}
        />
      </Modal>
    </Card>
  );
};

export default BranchTable;

const _branchRecords = (branch?: Branch) => {
  return [
    {
      style: { flex: 2 },
      label: "Name",
      value: branch ? <Text> {branch.name || "-"}</Text> : "",
    },
    {
      style: { flex: 2 },
      label: "Short Name",
      value: branch ? <Text> {branch.shortName || "-"}</Text> : "",
    },
    {
      style: { flex: 1 },
      label: "Phone",
      value: (
        <Text>
          {formatPhoneNumber(branch?.phone as string) || "-"}
        </Text>
      ),
    },
    {
      style: { flex: 2 },
      label: "Email",
      value: branch ? <Text> {branch.email || "-"}</Text> : "",
    },
    {
      style: { flex: 2 },
      label: "Address",
      value: branch ? <Text> {branch.address || "-"}</Text> : "",
    },
  ];
};

// TODO @ndyenchi: move this block utils or helpers
function _rowsBuilder(
  branches: Branch[],
  onDelete: (id: string) => void,
  toggleEditModal: (chain: Branch) => void,
  t: (key: string) => string,
) {
  return (
    branches &&
    branches.map((branch, inx) => (
      <Box key={inx} className={classes.item}>
        {_branchRecords(branch).map(
          ({ label, style, value }, index) => {
            return (
              <Box
                key={index}
                className={classes.itemDetail}
                style={style}
              >
                <Text className={classes.label}>
                  {t(label || "")}
                </Text>
                {value}
              </Box>
            );
          },
        )}
        {/* TODO @ndyenchi: move this block to separate component */}
        <Box className={classes.itemDetail}>
          <Text className={classes.label}></Text>
          <Action
            title={t("Confirm")}
            description={`${t("Delete branch")} "${branch.name}"`}
            onDelete={() => onDelete(branch.id || "")}
            onEdit={() => toggleEditModal(branch)}
          />
        </Box>
      </Box>
    ))
  );
}
