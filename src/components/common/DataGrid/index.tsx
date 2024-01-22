import { DataGridColumnProps } from "@/types";
import { Box, Table } from "@mantine/core";
import cls from "classnames";
import { useCallback, useEffect, useMemo, useState } from "react";
import Scroll from "../InfiniteScroll";
import classes from "./DataGrid.module.scss";
import { TAKE } from "@/configs/constants";

type Props<T> = {
  className?: string;
  columns: DataGridColumnProps[];
  handleRowClick?: (value: T) => void;
  fetchData: (
    cursor?: string,
  ) => Promise<{ cursor?: string; data: T[] }>;
  triggerSearch?: number;
};

function DataGrid<T>({
  className,
  columns,
  handleRowClick,
  fetchData,
  triggerSearch,
}: Props<T>) {
  const [hasMore, setHasMore] = useState(true);
  const [cursor, setCursor] = useState<string>("");
  const [rows, setRows] = useState<T[]>([]);

  const _rowBuilder = useMemo(
    () => rowBuilder(rows, columns, handleRowClick),
    [columns, rows, handleRowClick],
  );

  useEffect(() => {
    setCursor("");
    setRows([]);
    handleScroll();
  }, [triggerSearch]);

  const handleScroll = useCallback(async () => {
    const { data, cursor: _cursor } = await fetchData(cursor);
    if (data.length > 0) {
      setRows((state) => {
        const newData = Array.isArray(data) ? data : [];
        return [...state, ...newData];
      });
      setCursor(_cursor || "");
    } else if (data.length === 0 || data.length < TAKE) {
      setHasMore(false);
    }
  }, [cursor, fetchData]);

  return (
    <Table.ScrollContainer minWidth={500} p={0} mt={20} w="100%">
      <div className={cls(classes.container, className)}>
        <div>
          <Scroll
            hasMore={hasMore}
            dataLength={rows.length}
            rows={_rowBuilder}
            handleScroll={handleScroll}
          />
        </div>
      </div>
    </Table.ScrollContainer>
  );
}
export default DataGrid;

function rowBuilder<T>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rows: any[],
  columns: DataGridColumnProps[],
  handleRowClick?: (record: T) => void,
) {
  return (
    <>
      <div className={classes.headerRow}>
        {columns.map((column) => (
          <Box
            key={column.key}
            className={classes.headerCell}
            w={column.width}
          >
            {column.header}
          </Box>
        ))}
      </div>
      {rows.length > 0 &&
        rows.map((row, index) => (
          <Box
            key={index}
            className={classes.dataRow}
            onClick={() => handleRowClick && handleRowClick(row)}
          >
            {columns.map((column) => (
              <Box
                key={column.key}
                w={column.width}
                className={classes.dataCell}
              >
                {(column.renderCell &&
                  column.renderCell(row[column.key])) ||
                  row[column.key] ||
                  "-"}
              </Box>
            ))}
          </Box>
        ))}
    </>
  );
}
