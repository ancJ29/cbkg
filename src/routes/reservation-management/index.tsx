import CreateReservationForm from "@/components/ReservationManagement/CreateReservationForm";
import FilterReservationForm from "@/components/ReservationManagement/FilterReservationForm";
import DivButton from "@/components/common/DivButton";
import Modal from "@/components/common/Modal";
import SearchBar from "@/components/common/SearchBar";
import Table from "@/components/common/Table";
import useTranslation from "@/hooks/useTranslation";
import useAuthStore from "@/stores/auth.store";
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
import getReservation, {
  STATUS_BOOKING,
  addReservation,
} from "@/services/reservation";

const ReservationManagement = () => {
  const t = useTranslation();
  const { user } = useAuthStore();
  const [reservations, setReservation] = useState<Reservation[]>([]);
  const [filter, setFilter] = useState<FilterProps>({
    chainId: user?.chains?.[0].id || user?.branches?.[0].chainId,
    branchId: user?.branches?.[0].id,
  });
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

  const onAddReservation = async (value: Reservation) => {
    const res = await addReservation(value);
    !!res && close();
  };

  const currentGuests = useMemo(() => {
    const currentDate = dayjs().format("YYYY-MM-DD");

    return reservations.reduce((count, item) => {
      const reservationDate = dayjs(item.date).format("YYYY-MM-DD");
      return currentDate === reservationDate ? count + 1 : count;
    }, 0);
  }, [reservations]);

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
              filter={filter}
              setFilter={setFilter}
              onFilter={() => closeDrawer()}
            />
          </Drawer>
        ) : (
          <Flex my={20} justify="space-between" align="flex-start">
            <FilterReservationForm
              filter={filter}
              setFilter={setFilter}
            />
          </Flex>
        )}

        <SearchBar
          filter={filter}
          setFilter={setFilter}
          keys={[]}
          leftSection={
            <Flex gap={20} align="center">
              <Text fw={500}>
                {t("Current dining table count: ")}
                {/* TODO: current table */}
                <span className="text-hight-light">0</span>/0
              </Text>
              <Text fw={500}>
                {t("Current number of guests: ")}
                <span className="text-hight-light">
                  {currentGuests || 0}
                </span>
                /{reservations.length}
              </Text>
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
        <CreateReservationForm
          trigger={trigger}
          onSubmit={onAddReservation}
        />
      </Modal>
    </Stack>
  );
};

export default ReservationManagement;

// TODO:
const _records = (data?: Reservation, t?: (k: string) => string) => {
  return [
    {
      style: { flex: 3 },
      label: "Status",
      value: (
        <Text>
          {(t &&
            t(
              STATUS_BOOKING[
                data?.status as keyof typeof STATUS_BOOKING
              ],
            )) ||
            "-"}
        </Text>
      ),
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
      label: "Order date",
      value: (
        <Text>{dayjs(data?.from).format("YYYY-MM-DD") || "-"}</Text>
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
      value: <Text> {data?.note || "-"}</Text>,
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
        {_records(item, t).map(({ label, style, value }, index) => {
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
