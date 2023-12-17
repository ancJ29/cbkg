import Action from "@/components/common/Action";
import Select from "@/components/common/Select";
import Table from "@/components/common/Table";
import TextInput from "@/components/common/TextInput";
import useOnMounted from "@/hooks/useOnMounted";
import useTranslation from "@/hooks/useTranslation";
import { getBranches } from "@/services";
import useBranchStore from "@/stores/branch.store";
import useChainStore from "@/stores/chain.store";
import { Branch, FilterProps } from "@/types";
import { Box, Card, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { useCallback, useState } from "react";
import BranchForm from "../Form";
import classes from "./Table.module.scss";

const StoreTable = () => {
  const t = useTranslation();
  const { options: OPTION_CHAIN } = useChainStore();
  const { branches, deleteBranch, editBranch } = useBranchStore();
  const [data, setData] = useState<Branch[]>([]);
  const [name, setName] = useState("");
  const [openedModal, { open: openModal, close: closeModal }] =
    useDisclosure(false);
  const [branch, setBranch] = useState<Branch>();
  const [filter, setFilter] = useState<FilterProps>({});

  const fetchData = useCallback(async () => {
    const _data = getBranches(branches, filter);
    setData(await _data);
  }, [branches, filter]);

  const onEdit = useCallback(
    async (value: Branch) => {
      editBranch(value);
      closeModal();
    },
    [closeModal, editBranch],
  );

  useOnMounted(
    useCallback(() => {
      fetchData();
    }, [fetchData]),
  );

  return (
    <Card withBorder shadow="md" w="100%">
      <Text fz={16} fw="bold" pb={5} className="bdr-b">
        {t("Branches List")}
      </Text>
      <Box mt={10} className={classes.container}>
        <Select
          placeholder={t("Select chains")}
          options={OPTION_CHAIN}
          onChange={(value) => {
            setFilter({ ...filter, chainId: value as string });
          }}
        />
        <TextInput
          value={name}
          placeholder={t("Search by name")}
          onChange={(e) => setName(e.target.value)}
          rightSection={<IconSearch />}
          onEnter={() => {
            setFilter({ ...filter, name: name });
          }}
        />
      </Box>

      <Table
        headers={headers}
        dataLength={data.length}
        hasMore={false}
        rows={rows(data, deleteBranch, openModal, setBranch, t)}
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
        <BranchForm branch={branch} onSave={onEdit} action="edit" />
      </Modal>
    </Card>
  );
};
export default StoreTable;
const headers = ["ID", "Name", "Phone", "Email"];

const rows = (
  elements: Branch[],
  onDelete?: (id: string, action: string) => void,
  openModal?: () => void,
  setBranch?: (value: Branch) => void,
  t?: (key: string) => string,
) => {
  return elements.map((element) => (
    <Box key={element.id} className={classes.item}>
      <Box className={classes.itemDetail}>
        <Text className={classes.label}>
          {t && t(headers[0] || "")}
        </Text>
        <Text>{element.id || "-"}</Text>
      </Box>
      <Box className={classes.itemDetail}>
        <Text className={classes.label}>
          {t && t(headers[1] || "")}
        </Text>
        <Text>{element.name || "-"}</Text>
      </Box>
      <Box className={classes.itemDetail}>
        <Text className={classes.label}>
          {t && t(headers[2] || "")}
        </Text>
        <Text>{element.phone || "-"}</Text>
      </Box>
      <Box className={classes.itemDetail}>
        <Text className={classes.label}>
          {t && t(headers[3] || "")}
        </Text>
        <Text>{element.email || "-"}</Text>
      </Box>

      <Box className={classes.itemDetail} style={{ flex: 1 }}>
        <Text className={classes.label}></Text>

        <Action
          title={t && t("Confirm")}
          description={`${t && t("Delete branch ")} "${
            element.name
          }"`}
          onDelete={() =>
            onDelete && onDelete(element.id as string, "delete")
          }
          onEdit={() => {
            openModal && openModal();
            setBranch && setBranch(element);
          }}
        />
      </Box>
    </Box>
  ));
};
