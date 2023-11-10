import { Anchor, Flex, Text } from "@mantine/core";

interface Props {
  width?: string;
  height?: string;
}

export const Logo: React.FC<Props> = () => {
  return (
    <Flex direction='row' align='center' gap={4}>
      <Anchor href='/dashboard' style={{ whiteSpace: "nowrap" }}>
        <Text fw='bolder' fz='1.25rem'>
          C-Booking
          <Text fz='1.25rem' component='span' fw='normal' c='gray'>
            Admin
          </Text>
        </Text>
      </Anchor>
    </Flex>
  );
};
