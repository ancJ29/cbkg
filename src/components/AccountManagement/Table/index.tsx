import Action from "@/components/common/Action";
import useTranslation from "@/hooks/useTranslation";
import { User, UserRequest } from "@/types";
import { Box, Card, Chip, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useCallback, useState } from "react";
import Form from "../Form";
import classes from "./Table.module.scss";
import useUserStore from "@/stores/user.store";
import Table from "@/components/common/Table";
import { FilterProps, getUsers } from "@/services";
import useWatchProp from "@/hooks/useWatchProp";
import useOnMounted from "@/hooks/useOnMounted";
import SearchBar from "../../common/SearchBar";
import useChainStore from "@/stores/chain.store";
import useBranchStore from "@/stores/branch.store";

const AccountTable = () => {
  const t = useTranslation();
  const { users, deleteUser, editUser } = useUserStore();

  const [openedModal, { open: openModal, close: closeModal }] =
    useDisclosure(false);
  const [user, setUser] = useState<User>();
  const [filter, setFilter] = useState<FilterProps>({});
  const [data, setData] = useState<User[]>();
  const { chains } = useChainStore();
  const { branches } = useBranchStore();

  // TODO: edit user
  const onEdit = useCallback(
    async (value: UserRequest) => {
      editUser(value);
      closeModal();
    },
    [closeModal, editUser],
  );

  const fetchData = useCallback(async () => {
    const _data = getUsers(users, chains, branches, filter);
    setData(await _data);
  }, [branches, chains, filter, users]);

  const handleScroll = () => {
    fetchData();
  };

  useWatchProp(filter, () => fetchData());

  useOnMounted(
    useCallback(() => {
      fetchData();
    }, [fetchData]),
  );

  return (
    <Card withBorder shadow="md" w="100%">
      <>
        <Text fz={16} fw="bold" pb={5} className="bdr-b">
          {t("Account list")}
        </Text>
        <SearchBar filter={filter} setFilter={setFilter} />
        <Table
          dataLength={data?.length || 0}
          hasMore={false}
          headers={headers}
          rows={rows(data, deleteUser, openModal, setUser, t)}
          handleScroll={handleScroll}
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
          <Form user={user} onSave={onEdit} action="Edit" />
        </Modal>
      </>
    </Card>
  );
};
export default AccountTable;

const headers = ["Account", "Chains", "Branches", "Status"];

const rows = (
  elements?: User[],
  onDelete?: (id: string, action: string) => void,
  openModal?: () => void,
  setUser?: (value: User) => void,
  t?: (key: string) => string,
) => {
  return elements?.map((element, inx) => (
    <Box key={inx} className={classes.item}>
      <Box className={classes.itemDetail}>
        <Text className={classes.label}>
          {t && t(headers[0] || "")}
        </Text>
        <Text>{element.name || "-"}</Text>
      </Box>
      <Box className={classes.itemDetail}>
        <Text className={classes.label}>
          {t && t(headers[1] || "")}
        </Text>
        <Text> {element.chain?.name || "-"}</Text>
      </Box>
      <Box className={classes.itemDetail}>
        <Text className={classes.label}>
          {t && t(headers[2] || "")}
        </Text>
        <Text> {element.branch?.name || "-"}</Text>
      </Box>
      <Box className={classes.itemDetail}>
        <Text className={classes.label}>
          {t && t(headers[3] || "")}
        </Text>
        <Chip checked={element.active}>
          {element.active ? "Active" : "Disable"}
        </Chip>
      </Box>
      <Box className={classes.itemDetail}>
        <Text className={classes.label}></Text>
        <Action
          disable={!element.active}
          title={t && t("Confirm")}
          description={
            // eslint-disable-next-line quotes
            t && t("Delete user") + ' "' + element.name + '"'
          }
          onDelete={() =>
            onDelete && onDelete(element.id as string, "delete")
          }
          onEdit={() => {
            openModal && openModal();
            setUser && setUser(element);
          }}
        />
      </Box>
    </Box>
  ));
};
