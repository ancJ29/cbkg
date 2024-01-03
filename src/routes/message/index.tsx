import SearchBar from "@/components/common/SearchBar";
import Table from "@/components/common/Table";
import { FilterProps, Message } from "@/types";
import { useMemo, useState } from "react";
import useMessageStore from "@/stores/message.store";
import { Box, Card, Stack, Text } from "@mantine/core";
import useTranslation from "@/hooks/useTranslation";

const MessageMange = () => {
  const { message } = useMessageStore();
  const t = useTranslation();
  const [filter, setFilter] = useState<FilterProps>({});

  const rows = useMemo(
    () => <>{_rowsBuilder(message, t)}</>,
    [message, t],
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
        <SearchBar filter={filter} setFilter={setFilter} />
        <Table
          headers={records}
          dataLength={message.length || 0}
          rows={rows}
          hasMore={false}
        />
      </Card>
    </Stack>
  );
};
export default MessageMange;

const _records = (data?: Message) => {
  return [
    {
      style: { flex: 2 },
      label: "Code",
      value: <Text> {data?.name || "-"}</Text>,
    },
  ];
};

function _rowsBuilder(data: [], t: (key: string) => string) {
  return data?.map((item, inx) => (
    <Box key={inx}>
      {_records(item).map(({ label, style, value }, index) => {
        return (
          <Box key={index} style={style}>
            <Text>{t && t(label || "")}</Text>
            {value}
          </Box>
        );
      })}
    </Box>
  ));
}
