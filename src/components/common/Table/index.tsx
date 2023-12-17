import useTranslation from "@/hooks/useTranslation";
import Scroll from "../Scroll";
import classes from "./Table.module.scss";

import { Box, Card } from "@mantine/core";
type Props = {
  headers: string[];
  dataLength: number;
  rows: React.ReactNode;
  handleScroll?: () => void;
  hasMore: boolean;
};
const Table = ({
  headers,
  dataLength,
  rows,
  hasMore,
  handleScroll,
}: Props) => {
  const t = useTranslation();
  return (
    <Card
      className={classes.tableWrapper}
      p={0}
      radius={8}
      mt={20}
      w="100%"
      shadow="none"
    >
      <Box className={classes.header}>
        {headers?.map((header, index) => (
          <Box key={index} style={{ flex: 1 }}>
            {t(header)}
          </Box>
        ))}
        <Box style={{ flex: 1 }}>&nbsp;</Box>
      </Box>
      <Scroll
        dataLength={dataLength}
        hasMore={hasMore}
        handleScroll={() => handleScroll && handleScroll()}
        rows={rows}
      />
    </Card>
  );
};
export default Table;
