import { Center, Text } from "@mantine/core";

const TextCenter = ({ children }: { children: React.ReactNode }) => {
  return (
    <Center>
      <Text>{children}</Text>
    </Center>
  );
};

export default TextCenter;
