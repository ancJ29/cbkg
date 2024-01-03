import CreateReservationForm from "@/components/ReservationManagement/CreateReservationForm";
import FilterReservationForm from "@/components/ReservationManagement/FilterReservationForm";
import DivButton from "@/components/common/DivButton";
import Modal from "@/components/common/Modal";
import SearchBar from "@/components/common/SearchBar";
import Table from "@/components/common/Table";
import useTranslation from "@/hooks/useTranslation";
import { FilterProps, Reservation } from "@/types";
import {
  Box,
  Button,
  Card,
  Drawer,
  Flex,
  Stack,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconFilter, IconPrinter } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
import { isMobile } from "react-device-detect";
import classes from "./Reservation.module.scss";
import getReservation from "@/services/reservation";

const ReservationManagement = () => {
  const t = useTranslation();
  const [reservations, setReservation] = useState<Reservation[]>([]);
  const [filter, setFilter] = useState<FilterProps>({});
  const [opened, { open, close }] = useDisclosure(false);
  const [openedDrawer, { open: openDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [trigger, setTrigger] = useState(Date.now());

  const rows = useMemo(
    () => <>{_rowsBuilder(reservations, t)}</>,
    [reservations, t],
  );
  const records = useMemo(_records, []);

  useEffect(() => {
    const fetchData = async () => {
      setReservation(await getReservation(filter));
    };
    fetchData();
  }, [filter]);

  return (
    <Stack
      gap={10}
      bg="gray.1"
      w="100%"
      h="100%"
      p={10}
      pos="relative"
    >
      <Card withBorder shadow="md" w="100%">
        <Flex className="bdr-b" justify="space-between">
          <Text fz={16} fw="bold" pb={5}>
            {t("Reservation list")}
          </Text>
          <Flex>
            <DivButton
              className={`align-center flex ${
                isMobile ? classes.filterItem : ""
              }`}
            >
              <IconPrinter stroke={1} size={20} />
            </DivButton>
            <DivButton
              className={`align-center ${classes.filter}`}
              onClick={openDrawer}
            >
              <IconFilter stroke={1} size={20} />
            </DivButton>
          </Flex>
        </Flex>
        <Flex my={20} justify="space-between" align="flex-start">
          {isMobile ? (
            <Drawer
              opened={openedDrawer}
              onClose={closeDrawer}
              title={t("Filter by")}
              position="right"
              transitionProps={{ duration: 0 }}
              classNames={{ title: "font-bold" }}
            >
              {/* TODO: filter */}
              <FilterReservationForm
                setFilter={setFilter}
                onFilter={() => closeDrawer()}
              />
            </Drawer>
          ) : (
            <FilterReservationForm setFilter={setFilter} />
          )}
        </Flex>

        <SearchBar
          filter={filter}
          setFilter={setFilter}
          keys={[]}
          leftSection={
            <Flex gap={20} align="center">
              <Text fw={500}>
                {t("Current dining table count: ")}
              </Text>
              <Text fw={500}>{t("Current number of guests: ")}</Text>
            </Flex>
          }
        />
        <Table
          headers={records}
          dataLength={reservations?.length || 0}
          rows={rows}
          hasMore={false}
          haveAction={false}
        />
      </Card>
      <Button className={classes.btn} onClick={open}>
        +
      </Button>
      <Modal
        onClose={close}
        opened={opened}
        size="60rem"
        centered
        title={t("Reserve")}
        footer={
          <Flex justify="center">
            <Button
              type="submit"
              onClick={() => setTrigger((state) => state + 1)}
            >
              {t("Create")}
            </Button>
          </Flex>
        }
      >
        <CreateReservationForm trigger={trigger} />
      </Modal>
    </Stack>
  );
};

export default ReservationManagement;

// TODO:
const _records = (data?: Reservation) => {
  return [
    {
      style: { flex: 2 },
      label: "Status",
      value: <Text> {data?.status || "-"}</Text>,
    },
    {
      style: { flex: 2 },
      label: "Phone",
      value: <Text> {data?.phone || "-"}</Text>,
    },
    {
      style: { flex: 2 },
      label: "Customer Name",
      value: <Text> {data?.contact || "-"}</Text>,
    },
    {
      style: { flex: 2 },
      label: "Quantity",
      // TODO: api
      value: <Text> {0}</Text>,
    },
    {
      style: { flex: 2 },
      label: "From",
      value: (
        <Text>{dayjs(data?.from).format("YYYY-MM-DD") || "-"}</Text>
      ),
    },
    {
      style: { flex: 2 },
      label: "To",
      value: (
        <Text>
          {data?.to ? dayjs(data?.to).format("YYYY-MM-DD") : "-"}
        </Text>
      ),
    },
    {
      style: { flex: 2 },
      label: "Table",
      value: <Text> {data?.tableId || "-"}</Text>,
    },
    {
      style: { flex: 2 },
      label: "Object",
      value: <Text> {data?.object || "-"}</Text>,
    },
    {
      style: { flex: 2 },
      label: "Required",
      value: <Text> {data?.require || "-"}</Text>,
    },
  ];
};

function _rowsBuilder(
  data: Reservation[],
  t: (key: string) => string,
) {
  return (
    data.length > 0 &&
    data.map((item, inx) => (
      <Box key={inx} className={classes.item}>
        {_records(item).map(({ label, style, value }, index) => {
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
      </Box>
    ))
  );
}
