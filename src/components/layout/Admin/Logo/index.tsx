import { Anchor, Flex, Text } from "@mantine/core";
const Logo = () => {
  return (
    <Flex direction="row" align="center" gap={4}>
      <Anchor href="/dashboard" style={{ whiteSpace: "nowrap" }}>
        <Text fw="bolder" fz="1.25rem">
          C-Booking
          <Text
            pl=".3rem"
            fz="1.25rem"
            component="span"
            fw="normal"
            c="gray"
          >
            Admin
          </Text>
        </Text>
      </Anchor>
    </Flex>
  );
};
export default Logo;
