import {
  Group,
  Text,
  Collapse as CollapseMantine,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { isMobile } from "react-device-detect";

type Props = {
  title?: string;
  children?: React.ReactNode;
};
const Collapse = ({ title, children }: Props) => {
  const [opened, { toggle }] = useDisclosure(isMobile ? false : true);

  return (
    <>
      <Group
        justify="space-between"
        w="100%"
        onClick={toggle}
        className="cursor-pointer"
      >
        <Text fz={16} fw="bold" mb={5}>
          {title}
        </Text>
        {!opened ? <IconChevronDown /> : <IconChevronUp />}
      </Group>
      <CollapseMantine in={opened}>
        <div className="bdr-t"></div>
        {children}
      </CollapseMantine>
    </>
  );
};
export default Collapse;
