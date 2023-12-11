import useTranslation from "@/hooks/useTranslation";
import {
  Card,
  Center,
  Loader,
  Box,
  Text,
  Modal,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useCallback, useEffect, useState } from "react";
import { Branch, OptionProps, STATUS_CODE } from "@/types";
import classes from "./Table.module.scss";
import TextInput from "@/components/common/TextInput";
import Scroll from "@/components/common/Scroll";
import useBranchStore from "@/stores/branch.store";
import { useDisclosure } from "@mantine/hooks";
import {
  deleteBranch,
  getBranches,
  getChains,
  updateBranch,
} from "@/services";
import { TAKE } from "@/configs/constants";
import logger from "@/services/logger";
import useOnMounted from "@/hooks/useOnMounted";
import useWatchProp from "@/hooks/useWatchProp";
import Action from "@/components/common/Action";
import BranchForm from "../Form";
import Select from "@/components/common/Select";

const StoreTable = ({
  triggerBranch,
}: {
  triggerBranch?: number;
}) => {
  const t = useTranslation();
  const branchStore = useBranchStore();

  const [data, setData] = useState<Branch[]>(
    useBranchStore.getState().branches || [],
  );
  const [cursor, setCursor] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [name, setName] = useState("");
  const [openedModal, { open: openModal, close: closeModal }] =
    useDisclosure(false);
  const [branch, setBranch] = useState<Branch>();
  const [trigger, setTrigger] = useState(Date.now());
  const [error, setError] = useState("");
  const [chains, setChains] = useState<OptionProps[]>([]);
  const [chain, setChain] = useState("");

  const fetchData = useCallback(
    async (search?: boolean) => {
      const response = await getBranches({
        take: TAKE,
        cursor: search ? "" : cursor,
        name: name.trim(),
        chainId: chain || undefined,
      });
      if (response.status >= STATUS_CODE.ERROR) {
        logger.error(response.error);
        return;
      }
      branchStore.setBranches(response.data.branches, search);
      setData(useBranchStore.getState().branches || []);
      if (response.data.branches.length >= TAKE) {
        setCursor(response.data.cursor);
      } else {
        setHasMore(false);
        logger.warn("No more branches to fetch.");
      }
    },
    [branchStore, chain, cursor, name],
  );
  const handleScroll = () => {
    fetchData();
  };
  const onDelete = async (id: string) => {
    const res = await deleteBranch(id);
    if (res.status >= STATUS_CODE.ERROR) {
      logger.error(res.error);
    } else {
      branchStore.deleteBranch(id);
      setData(useBranchStore.getState().branches);
    }
  };

  const onEdit = useCallback(
    async (value: Branch) => {
      const res = await updateBranch(value);
      if (res.status >= STATUS_CODE.ERROR) {
        setError(res.error || "error");
      } else {
        setError("");
        branchStore.editBranch(value);
        setData(useBranchStore.getState().branches);
        closeModal();
      }
    },
    [branchStore, closeModal],
  );
  useOnMounted(
    useCallback(() => {
      if (loaded) {
        return;
      }
      fetchData(true);
      setLoaded(true);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchData, loaded]),
  );
  useWatchProp(triggerBranch, () => {
    fetchData(true);
  });
  useWatchProp(trigger, () => {
    fetchData(true);
  });
  const fetchChain = async () => {
    const response = await getChains({
      take: 100,
    });
    if (response.status >= STATUS_CODE.ERROR) {
      logger.warn(response.error);
      return;
    }
    setChains(response.data.chains);
  };
  useEffect(() => {
    fetchChain();
  }, []);

  return (
    <Card withBorder shadow="md" w="100%">
      {!loaded ? (
        <Center>
          <Loader />
        </Center>
      ) : (
        <>
          <Text fz={16} fw="bold" pb={5} className="bdr-b">
            {t("Branches List")}
          </Text>
          <Box mt={10} className={classes.container}>
            <Select
              placeholder={t("Select chains")}
              options={chains}
              onChange={(value) => {
                setChain(value as string);
                setTrigger(trigger + 1);
              }}
            />
            <TextInput
              value={name}
              placeholder={t("Search by name")}
              onChange={(e) => setName(e.target.value)}
              rightSection={<IconSearch />}
              onEnter={() => {
                fetchData(true);
              }}
            />
          </Box>
          <Card
            withBorder
            p={0}
            radius={4}
            mt={20}
            className={classes.tableWrapper}
          >
            <Box className={classes.header}>
              {headers?.map((header, index) => (
                <Box key={index} style={{ flex: 2 }}>
                  {header}
                </Box>
              ))}
              <Box style={{ flex: 1 }}>&nbsp;</Box>
            </Box>
            <Scroll
              dataLength={data.length}
              hasMore={hasMore}
              handleScroll={handleScroll}
              rows={rows(data, onDelete, openModal, setBranch, t)}
            />
          </Card>
          <Modal
            opened={openedModal}
            onClose={closeModal}
            title={t("Edit Branch")}
            centered
            size="lg"
            classNames={{ title: "font-bold" }}
          >
            <div className="bdr-t"></div>
            <BranchForm
              branch={branch}
              onSave={onEdit}
              action="edit"
              trigger={trigger}
              error={error}
            />
          </Modal>
        </>
      )}
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
