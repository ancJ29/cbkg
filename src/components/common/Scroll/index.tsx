import InfiniteScroll from "react-infinite-scroll-component";
import { Center, Loader, Box } from "@mantine/core";
import { isMobile } from "react-device-detect";

type Props = {
  dataLength?: number;
  handleScroll: () => void;
  rows: React.ReactNode;
  hasMore?: boolean;
};
const Scroll = ({
  dataLength = 0,
  handleScroll,
  rows,
  hasMore = false,
}: Props) => {
  return (
    <div id="scrollableDiv" style={{ overflow: "auto" }}>
      <InfiniteScroll
        dataLength={dataLength}
        next={handleScroll}
        hasMore={hasMore}
        scrollableTarget={isMobile ? "" : "scrollableDiv"}
        loader={
          <Center>
            <Loader />
          </Center>
        }
        style={{ overflow: "hidden" }}
      >
        <Box>{rows}</Box>
      </InfiniteScroll>
    </div>
  );
};
export default Scroll;
