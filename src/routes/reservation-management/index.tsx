import SearchBar from "@/components/common/SearchBar";
import Table from "@/components/common/Table";
import useTranslation from "@/hooks/useTranslation";
import { FilterProps } from "@/types";
import {
  Text,
  Card,
  Stack,
  Box,
  Button,
  Modal,
  Flex,
  Drawer,
} from "@mantine/core";
import { useMemo, useState } from "react";
import classes from "./Reservation.module.scss";
import { Reservation } from "@/types/reservation";
import useReservationStore from "@/stores/reservation.store";
import { isMobile } from "react-device-detect";
import { useDisclosure } from "@mantine/hooks";
import CreateReservationForm from "@/components/ReservationManagement/CreateReservationForm";
import FilterReservationForm from "@/components/ReservationManagement/FilterReservationForm";
import { IconFilter, IconPrinter } from "@tabler/icons-react";
import DivButton from "@/components/common/DivButton";

const ReservationManagement = () => {
  const t = useTranslation();
  const [filter, setFilter] = useState<FilterProps>({});
  const { reservations } = useReservationStore();
  const [opened, { open, close }] = useDisclosure(false);
  const [openedDrawer, { open: openDrawer, close: closeDrawer }] =
    useDisclosure(false);

  const rows = useMemo(
    () => <>{_rowsBuilder(reservations, t)}</>,
    [reservations, t],
  );

  const records = useMemo(_records, []);

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
        <Text fz={16} fw="bold" pb={5} className="bdr-b">
          {t("Reservation list")}
        </Text>
        <Flex
          gap={20}
          mt={20}
          justify="space-between"
          align="flex-start"
        >
          <div className={classes.filter}></div>
          <div className={classes.filterItem}>
            <FilterReservationForm />
          </div>
          <Flex>
            <DivButton>
              <IconPrinter stroke={1} />
            </DivButton>
            <DivButton
              className={classes.filter}
              onClick={openDrawer}
            >
              <IconFilter stroke={1} />
            </DivButton>
          </Flex>
          <Drawer
            opened={openedDrawer}
            onClose={closeDrawer}
            title={t("Filter")}
            position="right"
            transitionProps={{ duration: 0 }}
          >
            <FilterReservationForm />
          </Drawer>
        </Flex>
        <SearchBar filter={filter} setFilter={setFilter} keys={[]} />
        <Table
          headers={records}
          dataLength={reservations?.length || 0}
          rows={rows}
          hasMore={false}
        />
      </Card>
      <Button
        radius={999}
        h={70}
        w={70}
        pos="absolute"
        bottom={isMobile ? "1rem" : "2rem"}
        right={isMobile ? "1rem" : "2rem"}
        fz={55}
        ta="center"
        onClick={open}
      >
        +
      </Button>
      <Modal
        onClose={close}
        opened={opened}
        size="80rem"
        centered
        title={t("Reserve")}
      >
        <CreateReservationForm />
      </Modal>
    </Stack>
  );
};

export default ReservationManagement;

const _records = (data?: Reservation) => {
  return [
    {
      style: { flex: 2 },
      label: "Name",
      value: <Text> {data?.name || "-"}</Text>,
    },
  ];
};
function _rowsBuilder(
  data: Reservation[],
  t: (key: string) => string,
) {
  return data?.map((item, inx) => (
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
  ));
}
