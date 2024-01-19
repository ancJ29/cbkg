import CreateReservationForm from "@/components/ReservationManagement/CreateReservationForm";
import EditReservationForm from "@/components/ReservationManagement/EditReservationForm";
import FilterReservationForm from "@/components/ReservationManagement/FilterReservationForm";
import DivButton from "@/components/common/DivButton";
import Table from "@/components/common/FlexTable";
import RowsBuilder from "@/components/common/RowBuilder";
import useTranslation from "@/hooks/useTranslation";
import getReservation, {
  BOOKING_STATUS,
} from "@/services/reservation";
import { FilterProps, Reservation } from "@/types";
import { formatPhoneNumber } from "@/utils";
import {
  Button,
  Card,
  Drawer,
  Flex,
  Pill,
  Stack,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconAdjustmentsHorizontal,
  IconFilter,
  IconPrinter,
  IconSearch,
} from "@tabler/icons-react";
import cls from "classnames";
import dayjs from "dayjs";
import { useCallback, useEffect, useMemo, useState } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import classes from "./Reservation.module.scss";

const ReservationManagement = () => {
  const t = useTranslation();
  const [opened, { open, close }] = useDisclosure(false);
  const [records] = useState(() => _records());
  const [reservations, setReservation] = useState<Reservation[]>([]);
  const [openedFilter, { toggle: toggleFilter }] =
    useDisclosure(false);
  const [
    openedEditForm,
    { open: openEditForm, close: closeEditForm },
  ] = useDisclosure(false);

  const [selectedReservation, setSelectedReservation] =
    useState<Reservation | null>(null);

  const handleRowClick = useCallback(
    (reservation: Reservation) => {
      setSelectedReservation(reservation);
      openEditForm();
    },
    [openEditForm],
  );

  const _reload = useCallback(async (filter?: FilterProps) => {
    return getReservation(filter || {}).then(setReservation);
  }, []);

  useEffect(() => {
    _reload();
  }, [_reload]);

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
              className={cls("flx-ct", classes.filterItem)}
              // TODO: print
              onClick={() => window.print()}
            >
              <IconPrinter stroke={1} size={20} />
            </DivButton>
            <DivButton
              className={cls("flx-ct", classes.filter)}
              onClick={toggleFilter}
            >
              <IconFilter stroke={1} size={20} />
            </DivButton>
          </Flex>
        </Flex>
        <MobileView>
          <Drawer
            opened={openedFilter}
            onClose={toggleFilter}
            title={t("Filter by")}
            position="right"
            transitionProps={{ duration: 0 }}
            classNames={{ title: "font-bold" }}
          >
            <FilterReservationForm
              onFilter={(filter: FilterProps) => {
                _reload(filter).then(toggleFilter);
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
        <Flex className={classes.label}>
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
          rows={
            <RowsBuilder<Reservation>
              data={reservations}
              onClick={handleRowClick}
              _records={_records}
            />
          }
          hasMore={false}
          haveAction={false}
          headerClassName={classes.header}
        />
      </Card>
      <Button className={classes.btn} onClick={open}>
        +
      </Button>
      <MobileView>
        <Flex w="100%" pos="fixed" bottom="2rem" justify="center">
          <Button
            radius={999}
            variant="outline"
            onClick={toggleFilter}
            px={10}
            bg="#ced4da"
          >
            <Flex align="center" gap={30}>
              <div className="flx-ct">
                <IconSearch />
                <Text>Search</Text>
              </div>
              <div className="flx-ct">
                <IconAdjustmentsHorizontal />
                Filter
              </div>
            </Flex>
          </Button>
        </Flex>
      </MobileView>
      <CreateReservationForm close={close} opened={opened} />

      {selectedReservation && (
        <EditReservationForm
          opened={openedEditForm}
          close={() => {
            closeEditForm();
            setSelectedReservation(null);
          }}
          data={selectedReservation}
        />
      )}
    </Stack>
  );
};

export default ReservationManagement;

const _records = (data?: Reservation, t?: (k: string) => string) => {
  return [
    {
      style: { width: "280px" },
      label: "Chain",
      value: data ? <Text> {data?.chain?.name || "-"}</Text> : "",
    },
    {
      style: { width: "150px" },
      label: "Branch",
      value: <Text> {data?.branch?.shortName || "-"}</Text>,
    },
    {
      style: {
        width: "150px",
        display: "flex",
        justifyContent: "center",
      },
      label: "Status",
      value: (
        <Pill
          classNames={{
            root: `bg-${data?.status
              ?.toString()
              .toLocaleLowerCase()}-status text-white`,
          }}
        >
          {(t &&
            t(
              BOOKING_STATUS[
                data?.status as keyof typeof BOOKING_STATUS
              ],
            )) ||
            "-"}
        </Pill>
      ),
    },
    {
      style: { width: "150px" },
      label: "Phone",
      value: <Text> {formatPhoneNumber(data?.phone || "-")}</Text>,
    },
    {
      style: { width: "150px" },
      label: "Customer Name",
      value: data ? <Text> {data?.contact || "-"}</Text> : "",
    },
    {
      style: { width: "100px" },
      label: "Quantity",
      // TODO: api
      value: <Text> {0}</Text>,
    },
    {
      style: { width: "150px" },
      label: "Order date",
      value: (
        <Text>
          {dayjs(data?.from).format("DD-MM-YYYY") || "-"}
          <br />
          {dayjs(data?.from).format("HH:mm") || "-"}
        </Text>
      ),
    },
    {
      style: { width: "100px" },
      label: "Table",
      value: data ? <Text> {data?.tableId || "-"}</Text> : "",
    },
    {
      style: { width: "120px" },
      label: "Object",
      value: data ? <Text> {data?.object || "-"}</Text> : "",
    },
    {
      style: { width: "200px" },
      label: "Required",
      value: data ? <Text> {data?.note || "-"}</Text> : "",
    },
  ];
};
