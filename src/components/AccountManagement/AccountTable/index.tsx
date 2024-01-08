import Action from "@/components/common/Action";
import Table from "@/components/common/Table";
import useToggleEditModal from "@/hooks/useToggleEditModal";
import useTranslation from "@/hooks/useTranslation";
import useMetaDataStore from "@/stores/meta-data.store";
import { User as Account, FilterProps } from "@/types";
import { Box, Card, Chip, Modal, Text } from "@mantine/core";
import { useMemo, useState } from "react";
import SearchBar from "../../common/SearchBar";
import EditAccountForm from "../EditAccountForm";
import classes from "./Table.module.scss";

type AccountTableProps = {
  accounts: Account[];
  updateAccount: (account: Account) => Promise<string>;
  disableAccount: (id: string) => Promise<string>;
};

const AccountTable = ({
  accounts,
  updateAccount,
  disableAccount,
}: AccountTableProps) => {
  const t = useTranslation();
  const { defaultChainId, defaultBranchId } = useMetaDataStore();
  const [filter, setFilter] = useState<FilterProps>({
    branchId: defaultBranchId,
    chainId: defaultChainId,
  });
  const {
    close,
    opened,
    record: account,
    toggleEditModal,
  } = useToggleEditModal<Account>();

  const rows = useMemo(
    () =>
      _rowsBuilder(
        accounts,
        filter,
        disableAccount,
        toggleEditModal,
        t,
      ),
    [accounts, filter, disableAccount, toggleEditModal, t],
  );

  const userRecords = useMemo(_userRecords, []);

  return (
    <Card withBorder shadow="md" w="100%">
      <Text fz={16} fw="bold" pb={5} className="bdr-b">
        {t("Account list")}
      </Text>
      <SearchBar filter={filter} setFilter={setFilter} />
      <Table
        dataLength={accounts?.length || 0}
        headers={userRecords}
        rows={rows}
        headerClassName={classes.header}
        tableWrapperClassName={classes.tableWrapper}
      />
      <Modal
        opened={opened}
        onClose={close}
        title={t("Edit Account")}
        centered
        size="lg"
        classNames={{ title: "font-bold" }}
      >
        <div className="bdr-t"></div>
        {account && (
          <EditAccountForm
            account={account}
            onSave={updateAccount}
            onFinish={close}
          />
        )}
      </Modal>
    </Card>
  );
};

export default AccountTable;

function _userRecords(account?: Account) {
  return [
    {
      style: { flex: 1 },
      label: "Account",
      value: account ? <Text> {account.userName || "-"}</Text> : "",
    },
    {
      style: { flex: 2 },
      label: "FullName",
      value: account ? <Text> {account.fullName || "-"}</Text> : "",
    },
    {
      style: { flex: 2 },
      label: "Chains",
      // TODO: multiple chain
      value: account ? (
        <Text> {account.chains?.[0]?.name || "-"}</Text>
      ) : (
        ""
      ),
    },
    {
      style: { flex: 2 },
      label: "Branches",
      // TODO: multiple branch
      value: account ? (
        <Text> {account.branches?.[0]?.shortName || "-"}</Text>
      ) : (
        ""
      ),
    },
    {
      style: { flex: 1 },
      label: "Status",
      value: (
        <Chip
          checked={account?.active}
          classNames={{ label: "cursor-initial" }}
        >
          {account?.active ? "Active" : "Disable"}
        </Chip>
      ),
    },
  ];
}

// TODO @ndyenchi: move this block utils or helpers
function _rowsBuilder(
  accounts: Account[],
  filter: FilterProps,
  onDelete: (id: string) => void,
  toggleEditModal: (account: Account) => void,
  t: (key: string) => string,
) {
  const keyword = filter.keyword?.toLocaleLowerCase() || "";

  return accounts?.filter(_filter)?.map((account, inx) => (
    <Box key={inx} className={classes.item}>
      {_userRecords(account).map(({ label, style, value }, index) => {
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
          disable={!account.active}
          title={t && t("Confirm")}
          description={`${t && t("Delete account")} "${
            account.fullName
          }"`}
          onDelete={() => onDelete(account.id || "")}
          onEdit={() => toggleEditModal(account)}
        />
      </Box>
    </Box>
  ));

  function _filter(account: Account) {
    if (filter.active !== undefined) {
      if (account.active !== filter.active) {
        return false;
      }
    }
    if (filter.chainId) {
      if (account.chains?.[0]?.id !== filter.chainId) {
        return false;
      }
    }
    if (filter.branchId) {
      if (account.chains?.[0]?.id !== filter.branchId) {
        return false;
      }
    }
    if (keyword) {
      if (account.fullName?.toLocaleLowerCase()?.includes(keyword)) {
        return true;
      }
      if (account.userName.toLocaleLowerCase()?.includes(keyword)) {
        return true;
      }
      return false;
    }
    return true;
  }
}
