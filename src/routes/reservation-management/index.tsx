import CreateReservationForm from "@/components/ReservationManagement/CreateReservationForm";
import FilterReservationForm from "@/components/ReservationManagement/FilterReservationForm";
import DivButton from "@/components/common/DivButton";
import Table from "@/components/common/FlexTable";
import Modal from "@/components/common/Modal";
import useTranslation from "@/hooks/useTranslation";
import getReservation, {
  BOOKING_STATUS,
  addReservation as _addReservation,
} from "@/services/reservation";
import { FilterProps, Reservation } from "@/types";
import { formatPhoneNumber } from "@/utils";
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
import cls from "classnames";
import dayjs from "dayjs";
import { useCallback, useEffect, useMemo, useState } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import classes from "./Reservation.module.scss";

const ReservationManagement = () => {
  const t = useTranslation();
  const [trigger, setTrigger] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [records] = useState(() => _records());
  const [reservations, setReservation] = useState<Reservation[]>([]);
  const [openedDrawer, { open: openDrawer, close: closeDrawer }] =
    useDisclosure(false);

  const rows = useMemo(
    () => _rowsBuilder(reservations, t),
    [reservations, t],
  );

  const _reload = useCallback(async (filter?: FilterProps) => {
    return getReservation(filter || {}).then(setReservation);
  }, []);

  useEffect(() => {
    _reload();
  }, [_reload]);

  const addReservation = useCallback(
    async (reservation: Reservation) => {
      await _addReservation(reservation);
      setTrigger(false);
      close();
    },
    [close],
  );

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
              className={cls("align-center flex", classes.filterItem)}
              // TODO: print
              onClick={() => window.print()}
            >
              <IconPrinter stroke={1} size={20} />
            </DivButton>
            <DivButton
              className={cls("align-center", classes.filter)}
              onClick={openDrawer}
            >
              <IconFilter stroke={1} size={20} />
            </DivButton>
          </Flex>
        </Flex>
        <MobileView>
          <Drawer
            opened={openedDrawer}
            onClose={closeDrawer}
            title={t("Filter by")}
            position="right"
            transitionProps={{ duration: 0 }}
            classNames={{ title: "font-bold" }}
          >
            <FilterReservationForm
              onFilter={(filter: FilterProps) => {
                _reload(filter).then(closeDrawer);
              }}
            />
          </Drawer>
        </MobileView>
        <BrowserView>
          <Flex my={20} justify="space-between" align="flex-start">
            <FilterReservationForm
              onFilter={(filter: FilterProps) => {
                _reload(filter);
              }}
            />
          </Flex>
        </BrowserView>
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
          <MobileView>
            <Flex justify="center">
              <Button type="submit" onClick={() => setTrigger(true)}>
                {t("Create")}
              </Button>
            </Flex>
          </MobileView>
        }
      >
        <CreateReservationForm
          trigger={trigger}
          onSubmit={addReservation}
        />
      </Modal>
    </Stack>
  );
};

export default ReservationManagement;

const _records = (data?: Reservation, t?: (k: string) => string) => {
  return [
    {
      style: { flex: 3 },
      label: "Chain",
      value: data ? <Text> {data?.chain?.name || "-"}</Text> : "",
    },
    {
      style: { flex: 3 },
      label: "Branch",
      value: data ? (
        <Text> {data?.branch?.shortName || "-"}</Text>
      ) : (
        ""
      ),
    },
    {
      style: { flex: 3 },
      label: "Status",
      value: (
        <Text>
          {(t &&
            t(
              BOOKING_STATUS[
                data?.status as keyof typeof BOOKING_STATUS
              ],
            )) ||
            "-"}
        </Text>
      ),
    },
    {
      style: { flex: 2 },
      label: "Phone",
      value: data ? (
        <Text> {formatPhoneNumber(data?.phone || "-")}</Text>
      ) : (
        ""
      ),
    },
    {
      style: { flex: 2 },
      label: "Customer Name",
      value: data ? <Text> {data?.contact || "-"}</Text> : "",
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
        <Text>
          {dayjs(data?.from).format("DD-MM-YYYY HH:mm") || "-"}
        </Text>
      ),
    },
    {
      style: { flex: 2 },
      label: "Table",
      value: data ? <Text> {data?.tableId || "-"}</Text> : "",
    },
    {
      style: { flex: 2 },
      label: "Object",
      value: data ? <Text> {data?.object || "-"}</Text> : "",
    },
    {
      style: { flex: 2 },
      label: "Required",
      value: data ? <Text> {data?.note || "-"}</Text> : "",
    },
  ];
};

// TODO @ndyenchi: move this block utils or helpers
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
              <Text className={classes.label}>{t(label || "")}</Text>
              {value}
            </Box>
          );
        })}
      </Box>
    ))
  );
}
