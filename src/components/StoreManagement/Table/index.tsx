import useTranslation from "@/hooks/useTranslation";
import { Card, Box, Text, Modal } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useCallback, useMemo, useState } from "react";
import { Branch, OptionProps } from "@/types";
import classes from "./Table.module.scss";
import TextInput from "@/components/common/TextInput";
import useBranchStore from "@/stores/branch.store";
import { useDisclosure } from "@mantine/hooks";
import { FilterProps, chainOptions, getBranches } from "@/services";
import useOnMounted from "@/hooks/useOnMounted";
import useWatchProp from "@/hooks/useWatchProp";
import Action from "@/components/common/Action";
import BranchForm from "../Form";
import Select from "@/components/common/Select";
import useChainStore from "@/stores/chain.store";
import Table from "@/components/common/Table";

const StoreTable = () => {
  const t = useTranslation();
  const { chains } = useChainStore();
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

  useWatchProp(filter, () => fetchData());

  useWatchProp(branches, () => fetchData());

  useOnMounted(
    useCallback(() => {
      fetchData();
    }, [fetchData]),
  );

  const OPTION_CHAIN: OptionProps[] = useMemo(
    () => chainOptions(chains),
    [chains],
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
          description={
            // eslint-disable-next-line quotes
            t && t("Delete chain") + ' "' + element.name + '"'
          }
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
