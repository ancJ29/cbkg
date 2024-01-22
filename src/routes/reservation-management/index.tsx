import CreateReservationForm from "@/components/ReservationManagement/CreateReservationForm";
import EditReservationForm from "@/components/ReservationManagement/EditReservationForm";
import FilterReservationForm from "@/components/ReservationManagement/FilterReservationForm";
import DivButton from "@/components/common/DivButton";
import useTranslation from "@/hooks/useTranslation";
import getReservation from "@/services/reservation";
import { FilterProps, Reservation } from "@/types";
import {
  Button,
  Card,
  Drawer,
  Flex,
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
import { useCallback, useEffect, useMemo, useState } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import classes from "./Reservation.module.scss";
import { CONFIGS } from "@/configs";
import DataGrid from "@/components/common/DataGrid";

const ReservationManagement = () => {
  const t = useTranslation();
  const [opened, { open, close }] = useDisclosure(false);
  const [openedFilter, { toggle: toggleFilter }] =
    useDisclosure(false);
  const [
    openedEditForm,
    { open: openEditForm, close: closeEditForm },
  ] = useDisclosure(false);
  const [selectedReservation, setSelectedReservation] =
    useState<Reservation | null>(null);
  const [filter, setFilter] = useState<FilterProps | undefined>({});
  const [triggerSearch, setTriggerSearch] = useState(Date.now());

  const dataGridConfig = useMemo(
    () => [
      CONFIGS.ChainNameConfig({ header: "Chain Name" }),
      CONFIGS.BranchShortNameConfig({
        header: "Branch Name",
      }),
      CONFIGS.StatusBookingConfig({}),
      CONFIGS.PhoneConfig({}),
      CONFIGS.CustomerNameConfig({}),
      CONFIGS.QuantityConfig({}),
      CONFIGS.OrderDateConfig({}),
      CONFIGS.TableConfig({}),
      CONFIGS.ObjectConfig({}),
      CONFIGS.RequiredConfig({}),
    ],
    [],
  );

  const handleRowClick = useCallback(
    (reservation: Reservation) => {
      setSelectedReservation(reservation);
      openEditForm();
    },
    [openEditForm],
  );

  useEffect(
    () => setTriggerSearch(triggerSearch + 1),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

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
                setFilter(filter);
                setTriggerSearch(triggerSearch + 1);
                toggleFilter();
              }}
            />
          </Drawer>
        </MobileView>

        <BrowserView>
          <Flex my={20} justify="space-between" align="flex-start">
            <FilterReservationForm
              onFilter={(filter: FilterProps) => {
                setFilter(filter);
                setTriggerSearch(triggerSearch + 1);
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
              {/* TODO:  currentGuests*/}
              {0}
            </span>
            /{0}
          </Text>
        </Flex>

        <DataGrid<Reservation>
          columns={dataGridConfig}
          handleRowClick={handleRowClick}
          fetchData={(cursor?: string) =>
            getReservation(filter, cursor)
          }
          triggerSearch={triggerSearch}
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
            <Flex align="center" gap={20}>
              <div className="flx-ct">
                <IconSearch />
                <Text className="text-14">{t("Search")}</Text>
              </div>
              <div className="flx-ct">
                <IconAdjustmentsHorizontal />
                {t("Filter")}
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
