import Action from "@/components/common/Action";
import Table from "@/components/common/Table";
import useTranslation from "@/hooks/useTranslation";
import useBranchStore from "@/stores/branch.store";
import { Branch, FilterProps } from "@/types";
import { Box, Card, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useCallback, useMemo, useState } from "react";
import classes from "./Table.module.scss";
import EditBranchForm from "../EditBranchForm";
import { formatPhoneNumber } from "@/utils";
import SearchBar from "@/components/common/SearchBar";

const BranchTable = () => {
  const t = useTranslation();
  const { branches: data, deleteBranch } = useBranchStore();
  const [openedModal, { open: openModal, close: closeModal }] =
    useDisclosure(false);
  const [branch, setBranch] = useState<Branch>();
  const [filter, setFilter] = useState<FilterProps>({});

  const toggleEditModal = useCallback(
    (branch: Branch) => {
      setBranch(branch);
      openModal();
    },
    [openModal],
  );

  const branches = useMemo(() => {
    return data.filter((item) => {
      if (filter?.name) {
        if (
          !(item?.name?.toLocaleLowerCase() || "").includes(
            filter.name.toLocaleLowerCase(),
          )
        ) {
          return false;
        }
      }
      if (filter?.chainId && !filter.chainId.includes(item.chainId)) {
        return false;
      }
      return true;
    });
  }, [data, filter]);

  const rows = useMemo(
    () => (
      <>{_rowsBuilder(branches, deleteBranch, toggleEditModal, t)}</>
    ),
    [deleteBranch, t, toggleEditModal, branches],
  );

  const branchRecords = useMemo(_branchRecords, []);

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
        hasMore={false}
        rows={rows}
        headerClassName={`${classes.header} ${classes.item}`}
        tableWrapperClassName={classes.tableWrapper}
      />
      <Modal
        opened={openedModal}
        onClose={closeModal}
        title={t("Edit Branch")}
        centered
        size="lg"
        classNames={{ title: "font-bold" }}
      >
        <div className="bdr-t"></div>
        <EditBranchForm branch={branch} />
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
      value: <Text> {branch?.name || "-"}</Text>,
    },
    {
      style: { flex: 2 },
      label: "Short Name",
      value: <Text> {branch?.shortName || "-"}</Text>,
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
      value: <Text> {branch?.email || "-"}</Text>,
    },
    {
      style: { flex: 2 },
      label: "Address",
      value: <Text> {branch?.address || "-"}</Text>,
    },
  ];
};
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
                  {t && t(label || "")}
                </Text>
                {value}
              </Box>
            );
          },
        )}
        <Box className={classes.itemDetail}>
          <Text className={classes.label}></Text>
          <Action
            title={t && t("Confirm")}
            description={`${t && t("Delete branch")} "${
              branch.name
            }"`}
            onDelete={() => onDelete(branch.id || "")}
            onEdit={() => toggleEditModal(branch)}
          />
        </Box>
      </Box>
    ))
  );
}
