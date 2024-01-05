import Action from "@/components/common/Action";
import Table from "@/components/common/Table";
import useTranslation from "@/hooks/useTranslation";
import useUserStore from "@/stores/user.store";
import { User } from "@/types";
import { Box, Card, Chip, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useCallback, useMemo, useState } from "react";
import SearchBar from "../../common/SearchBar";
import EditAccountForm from "../EditAccountForm";
import classes from "./Table.module.scss";

const _userRecords = (user?: User) => {
  return [
    {
      style: { flex: 2 },
      label: "Account",
      value: <Text> {user?.name || "-"}</Text>,
    },
    {
      style: { flex: 2 },
      label: "Chains",
      // TODO: multiple chain
      value: <Text> {user?.chains?.[0]?.name || "-"}</Text>,
    },
    {
      style: { flex: 2 },
      label: "Branches",
      // TODO: multiple branch
      value: <Text> {user?.branches?.[0]?.name || "-"}</Text>,
    },
    {
      style: { flex: 1 },
      label: "Status",
      value: (
        <Chip
          checked={user?.active}
          classNames={{ label: "cursor-initial" }}
        >
          {user?.active ? "Active" : "Disable"}
        </Chip>
      ),
    },
  ];
};

const AccountTable = () => {
  const t = useTranslation();
  const { users, disableUser, editUser, filter, setFilter } =
    useUserStore();
  const [openedModal, { open: openModal, close: closeModal }] =
    useDisclosure(false);
  // const [users] = useState<User[]>(data);
  const [user, setUser] = useState<User | undefined>();

  const toggleEditModal = useCallback(
    (user: User) => {
      setUser(user);
      openModal();
    },
    [openModal],
  );

  const rows = useMemo(
    () => <>{_rowsBuilder(users, disableUser, toggleEditModal, t)}</>,
    [disableUser, t, toggleEditModal, users],
  );

  const userRecords = useMemo(_userRecords, []);

  return (
    <Card withBorder shadow="md" w="100%">
      <Text fz={16} fw="bold" pb={5} className="bdr-b">
        {t("Account list")}
      </Text>
      <SearchBar filter={filter} setFilter={setFilter} />
      <Table
        dataLength={users?.length || 0}
        hasMore={false}
        headers={userRecords}
        rows={rows}
        headerClassName={classes.header}
        tableWrapperClassName={classes.tableWrapper}
      />
      <Modal
        opened={openedModal}
        onClose={closeModal}
        title={t("Edit User")}
        centered
        size="lg"
        classNames={{ title: "font-bold" }}
      >
        <div className="bdr-t"></div>
        {user && (
          <EditAccountForm
            user={user}
            onSave={editUser}
            onFinish={closeModal}
          />
        )}
      </Modal>
    </Card>
  );
};
export default AccountTable;

function _rowsBuilder(
  users: User[],
  onDelete: (id: string) => void,
  toggleEditModal: (user: User) => void,
  t: (key: string) => string,
) {
  return users?.map((user, inx) => (
    <Box key={inx} className={classes.item}>
      {_userRecords(user).map(({ label, style, value }, index) => {
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
          disable={!user.active}
          title={t && t("Confirm")}
          description={`${t && t("Delete user")} "${user.name}"`}
          onDelete={() => onDelete(user.id || "")}
          onEdit={() => toggleEditModal(user)}
        />
      </Box>
    </Box>
  ));
}
