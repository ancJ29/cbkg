import Table from "@/components/common/FlexTable";
import SearchBar from "@/components/common/SearchBar";
import { BOOKING_STATUS } from "@/services/reservation";
import useMessageStore from "@/stores/message.store";
import { FilterProps, Message } from "@/types";
import { formatPhoneNumber } from "@/utils";
import { Box, Card, Flex, Stack, Text } from "@mantine/core";
import { useMemo, useState } from "react";

const MessageMange = () => {
  const { messages } = useMessageStore();
  const [filter, setFilter] = useState<FilterProps>({});

  const rows = useMemo(
    () => <>{_rowsBuilder(messages)}</>,
    [messages],
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
        <SearchBar keys={[]} filter={filter} setFilter={setFilter} />
        <Table
          haveAction={false}
          headers={records}
          dataLength={messages.length || 0}
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
      label: "Phone",
      value: (
        <Text>
          {" "}
          {formatPhoneNumber(data?.destinations as string) || "-"}
        </Text>
      ),
    },
    {
      style: { flex: 2 },
      label: "Code",
      value: data?.params?.code ? (
        <Text> {data.params.code || "-"}</Text>
      ) : (
        ""
      ),
    },
    {
      style: { flex: 2 },
      label: "Status",
      value: (
        <Text>
          {BOOKING_STATUS[
            data?.status as keyof typeof BOOKING_STATUS
          ] || "-"}
        </Text>
      ),
    },
  ];
};

// TODO @ndyenchi: move this block utils or helpers
function _rowsBuilder(data: Message[]) {
  return (
    data.length > 0 &&
    data?.map((item, inx) => (
      <Flex key={inx}>
        {_records(item).map(({ style, value }, index) => {
          return (
            <Box key={index} style={style}>
              {value}
            </Box>
          );
        })}
      </Flex>
    ))
  );
}
