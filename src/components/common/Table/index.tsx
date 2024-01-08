import useTranslation from "@/hooks/useTranslation";
import { Box, Card, MantineStyleProp } from "@mantine/core";
import cls from "classnames";
import Scroll from "../Scroll";
import classes from "./Table.module.scss";

type Header = {
  style: MantineStyleProp;
  label: string;
};

type Props = {
  headers: Header[];
  dataLength: number;
  rows: React.ReactNode;
  handleScroll?: () => void;
  hasMore?: boolean;
  headerClassName?: string;
  tableWrapperClassName?: string;
  haveAction?: boolean;
};

const Table = ({
  headers,
  dataLength,
  rows,
  hasMore,
  handleScroll,
  headerClassName,
  tableWrapperClassName,
  haveAction = true,
}: Props) => {
  const t = useTranslation();

  return (
    <Card
      className={cls(classes.tableWrapper, tableWrapperClassName)}
      p={0}
      radius={8}
      mt={20}
      w="100%"
      shadow="none"
    >
      <Box className={cls(classes.header, headerClassName)}>
        {headers?.map(({ style, label }, index) => (
          <Box key={index} style={style}>
            {t(label)}
          </Box>
        ))}
        {haveAction && <Box style={{ flex: 1 }}>&nbsp;</Box>}
      </Box>
      <Scroll
        dataLength={dataLength}
        hasMore={hasMore}
        handleScroll={handleScroll}
        rows={rows}
      />
    </Card>
  );
};

export default Table;
