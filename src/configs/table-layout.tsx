/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { BOOKING_STATUS } from "@/services/reservation";
import { DataGridColumnProps, LayoutConfigProps } from "@/types";
import { Pill, Text } from "@mantine/core";
import dayjs from "dayjs";

export const CONFIGS: Record<
  string,
  (props: LayoutConfigProps) => DataGridColumnProps
> = {
  PhoneConfig: ({ width = 0 }: { width?: number }) => ({
    key: "phone",
    header: "Phone",
    width: Math.max(width, 150),
  }),
  ChainNameConfig: ({
    width = 0,
    header,
  }: {
    width?: number;
    header?: string;
  }) => ({
    key: "chain",
    header: header || "Name",
    width: Math.max(width, 150),
    renderCell: (params: any) => {
      return <span>{params.name}</span>;
    },
  }),
  BranchShortNameConfig: ({
    width = 0,
    header,
  }: {
    width?: number;
    header?: string;
  }) => ({
    key: "branch",
    header: header || "Name",
    width: Math.max(width, 150),
    renderCell: (params: any) => {
      return <span>{params.shortName}</span>;
    },
  }),
  BranchNameConfig: ({
    width = 0,
    header,
  }: {
    width?: number;
    header?: string;
  }) => ({
    key: "branch",
    header: header || "Name",
    width: Math.max(width, 150),
    renderCell: (params: any) => {
      return <span>{params.name}</span>;
    },
  }),
  StatusBookingConfig: ({ width = 0 }: { width?: number }) => ({
    key: "status",
    header: "Status",
    width: Math.max(width, 150),
    renderCell: (params: any) => {
      return (
        <Pill
          classNames={{
            root: `bg-${params.toLocaleLowerCase()}-status text-white`,
          }}
        >
          {BOOKING_STATUS[params as keyof typeof BOOKING_STATUS] ||
            "-"}
        </Pill>
      );
    },
  }),
  CustomerNameConfig: ({ width = 0 }: { width?: number }) => ({
    key: "contact",
    header: "Customer Name",
    width: Math.max(width, 150),
  }),
  QuantityConfig: ({ width = 0 }: { width?: number }) => ({
    key: "quantity",
    header: "Quantity",
    width: Math.max(width, 150),
  }),
  OrderDateConfig: ({ width = 0 }: { width?: number }) => ({
    key: "from",
    header: "Order date",
    width: Math.max(width, 150),
    renderCell: (params: any) => {
      return (
        <Text>
          {dayjs(params).format("DD-MM-YYYY") || "-"}
          <br />
          {dayjs(params).format("HH:mm") || "-"}
        </Text>
      );
    },
  }),
  TableConfig: ({ width = 0 }: { width?: number }) => ({
    key: "tableId",
    header: "Table",
    width: Math.max(width, 150),
  }),
  ObjectConfig: ({ width = 0 }: { width?: number }) => ({
    key: "object ",
    header: "Object ",
    width: Math.max(width, 150),
  }),
  RequiredConfig: ({ width = 0 }: { width?: number }) => ({
    key: "note",
    header: "Required",
    width: Math.max(width, 150),
  }),
};
