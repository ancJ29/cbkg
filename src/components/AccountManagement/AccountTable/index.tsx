import Action from "@/components/common/Action";
import GridTable, {
  rowsBuilder,
} from "@/components/common/GridTable";
import useToggleEditModal from "@/hooks/useToggleEditModal";
import useTranslation from "@/hooks/useTranslation";
import useMetaDataStore from "@/stores/meta-data.store";
import { User as Account, FilterProps } from "@/types";
import { Card, Chip, Modal, Text } from "@mantine/core";
import { useMemo, useState } from "react";
import SearchBar from "../../common/SearchBar";
import EditAccountForm from "../EditAccountForm";

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

  const headers = useMemo(_rowBuilder, []);

  return (
    <Card withBorder shadow="md" w="100%">
      <Text fz={16} fw="bold" pb={5} className="bdr-b">
        {t("Account list")}
      </Text>
      <SearchBar filter={filter} setFilter={setFilter} />
      <GridTable
        dataLength={accounts?.length || 0}
        headers={headers}
        rows={rows}
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

function _rowBuilder(account?: Account, t?: (k: string) => string) {
  return [
    {
      gridCol: 1.5,
      label: "Account",
      value: account ? <Text> {account.userName || "-"}</Text> : "",
    },
    {
      gridCol: 1.5,
      label: "FullName",
      value: account ? <Text> {account.fullName || "-"}</Text> : "",
    },
    {
      gridCol: 2.5,
      label: "Chains",
      // TODO: multiple chain
      value: account ? (
        <Text> {account.chains?.[0]?.name || "-"}</Text>
      ) : (
        ""
      ),
    },
    {
      gridCol: 2,
      label: "Branches",
      // TODO: multiple branch
      value: account ? (
        <Text> {account.branches?.[0]?.shortName || "-"}</Text>
      ) : (
        ""
      ),
    },
    {
      gridCol: 2,
      label: "Role",
      value: account ? (
        <Text> {t?.(account.role || "") || "-"}</Text>
      ) : (
        ""
      ),
    },
    {
      gridCol: 1.5,
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

function _rowsBuilder(
  accounts: Account[],
  filter: FilterProps,
  onDelete: (id: string) => void,
  toggleEditModal: (account: Account) => void,
  t: (key: string) => string,
) {
  const keyword = filter.keyword?.toLocaleLowerCase() || "";

  return rowsBuilder<Account>({
    records: accounts?.filter((account) =>
      _filter(account, filter, keyword),
    ),
    t,
    _rowBuilder,
    actionBuilder: (record) => (
      <Action
        disable={!record.active}
        title={t && t("Confirm")}
        description={`${t && t("Delete account")} "${
          record.fullName
        }"`}
        onDelete={() => onDelete(record.id || "")}
        onEdit={() => toggleEditModal(record)}
      />
    ),
  });
}

function _filter(
  account: Account,
  filter: FilterProps,
  keyword: string,
) {
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
