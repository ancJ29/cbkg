import Action from "@/components/common/Action";
import Select from "@/components/common/Select";
import TextInput from "@/components/common/TextInput";
import useTranslation from "@/hooks/useTranslation";
import logger from "@/services/logger";
import { Branch, Chain, User, UserRequest } from "@/types";
import { Box, Card, Chip, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { useCallback, useState } from "react";
import Form from "../Form";
import classes from "./Table.module.scss";
import useUserStore from "@/stores/user.store";
import Table from "@/components/common/Table";
import useChainStore from "@/stores/chain.store";
import useBranchStore from "@/stores/branch.store";

const AccountTable = () => {
  const t = useTranslation();
  const { users: data, deleteUser, editUser } = useUserStore();
  const { chains } = useChainStore();
  const { branches } = useBranchStore();
  const [name, setName] = useState("");
  const [openedModal, { open: openModal, close: closeModal }] =
    useDisclosure(false);
  const [user, setUser] = useState<User>();
  const [chain, setChain] = useState<Chain>();
  const [branch, setBranch] = useState<Branch>();

  const onDelete = async (id: string) => {
    deleteUser(id);
  };
  // TODO: edit user
  const onEdit = useCallback(
    async (value: UserRequest) => {
      editUser(value);
      closeModal();
    },
    [closeModal, editUser],
  );
  const fetchData = useCallback(() => {
    // TODO:
  }, []);
  const handleScroll = () => {
    fetchData();
  };
  const onSelectChain = useCallback(
    (value: string | null) => {
      const selectedChain = chains.find(
        (chains) => chains.id === value,
      );
      selectedChain && setChain(selectedChain);
      //TODO: search by chain id
    },
    [chains],
  );
  const onSelectBranch = useCallback(
    (value: string | null) => {
      const selected = branches.find((chains) => chains.id === value);
      selected && setBranch(selected);
      //TODO: search by branch id
    },
    [branches],
  );
  const onSelectStatus = useCallback((value: string | null) => {
    //TODO: filter by status
    logger.info(value);
  }, []);

  return (
    <Card withBorder shadow="md" w="100%">
      <>
        <Text fz={16} fw="bold" pb={5} className="bdr-b">
          {t("Account list")}
        </Text>
        <Box mt={10} className={classes.container}>
          <Box className={classes.container}>
            <Select
              placeholder={t("Select chains")}
              options={chains}
              onChange={onSelectChain}
            />
            {chain && (
              <Select
                placeholder={t("Select branches")}
                options={branches}
                value={branch?.id as string}
                onChange={onSelectBranch}
              />
            )}
            <Select
              placeholder={t("Select status")}
              options={[
                { id: "Active", name: "Action" },
                { id: "Disable", name: "Disable" },
              ]}
              onChange={onSelectStatus}
            />
          </Box>
          <TextInput
            value={name}
            placeholder={t("Search by name")}
            onChange={(e) => setName(e.target.value)}
            rightSection={<IconSearch />}
            onEnter={() => {
              fetchData();
            }}
          />
        </Box>
        <Table
          dataLength={data.length || 0}
          hasMore={false}
          headers={headers}
          rows={rows(data, onDelete, openModal, setUser, t)}
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
  elements: User[],
  onDelete?: (id: string, action: string) => void,
  openModal?: () => void,
  setUser?: (value: User) => void,
  t?: (key: string) => string,
) => {
  return elements.map((element, inx) => (
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
