import { OptionProps } from "@/types";
import {
  MultiSelect as MantineMultiSelect,
  MultiSelectProps,
} from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import classes from "./MultiSelect.module.scss";

interface Props extends MultiSelectProps {
  options: OptionProps[];
}
// TODO: remove it, merger with select
const MultiSelect = ({ options, ...props }: Props) => {
  const data = options.map(({ value, label }, index) => ({
    value: value.toString(),
    label,
    isLastOption: index === options.length - 1,
  }));

  return (
    <MantineMultiSelect
      data={data}
      checkIconPosition="right"
      rightSection={<IconChevronDown size={16} />}
      classNames={{
        input: "truncate",
        label: classes.label,
      }}
      {...props}
    />
  );
};
export default MultiSelect;
