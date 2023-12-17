import Action from "@/components/common/Action";
import Table from "@/components/common/Table";
import useTranslation from "@/hooks/useTranslation";
import useUserStore from "@/stores/user.store";
import { FilterProps, User } from "@/types";
import { Box, Card, Chip, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useCallback, useMemo, useState } from "react";
import SearchBar from "../../common/SearchBar";
import EditAccountForm from "../EditAccountForm";
import classes from "./Table.module.scss";

const headers = ["Account", "Chains", "Branches", "Status"];

const AccountTable = () => {
  const t = useTranslation();
  const { users, disableUser, editUser } = useUserStore();
  const [openedModal, { open: openModal, close: closeModal }] =
    useDisclosure(false);
  const [user, setUser] = useState<User | undefined>();
  const [filter, setFilter] = useState<FilterProps>({});
  // const [data, setData] = useState<User[]>();
  // const { chains } = useChainStore();
  // const { branches } = useBranchStore();

  // TODO: edit user
  // const onEdit = useCallback(
  //   async (value: EditUserRequest) => {
  //     editUser(value);
  //     closeModal();
  //   },
  //   [closeModal, editUser],
  // );

  // const fetchData = useCallback(async () => {
  //   const _data = getUsers(users, chains, branches, filter);
  //   setData(await _data);
  // }, [branches, chains, filter, users]);

  // useOnMounted(
  //   useCallback(() => {
  //     fetchData();
  //   }, [fetchData]),
  // );

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

  return (
    <Card withBorder shadow="md" w="100%">
      <Text fz={16} fw="bold" pb={5} className="bdr-b">
        {t("Account list")}
      </Text>
      <SearchBar filter={filter} setFilter={setFilter} />
      <Table
        dataLength={users?.length || 0}
        hasMore={false}
        headers={headers}
        rows={rows}
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
      <Box className={classes.itemDetail}>
        <Text className={classes.label}>
          {t && t(headers[0] || "")}
        </Text>
        <Text>{user.name || "-"}</Text>
      </Box>
      <Box className={classes.itemDetail}>
        <Text className={classes.label}>
          {t && t(headers[1] || "")}
        </Text>
        <Text> {user.chains?.[0]?.name || "-"}</Text>
      </Box>
      <Box className={classes.itemDetail}>
        <Text className={classes.label}>
          {t && t(headers[2] || "")}
        </Text>
        <Text> {user.branches?.[0]?.name || "-"}</Text>
      </Box>
      <Box className={classes.itemDetail}>
        <Text className={classes.label}>
          {t && t(headers[3] || "")}
        </Text>
        <Chip
          checked={user.active}
          classNames={{ label: "cursor-initial" }}
        >
          {user.active ? "Active" : "Disable"}
        </Chip>
      </Box>
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
