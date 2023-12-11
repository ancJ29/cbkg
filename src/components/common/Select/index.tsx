import React from "react";
import { OptionProps } from "@/types";
import { Select as MantineSelect, SelectProps } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";

interface ISelectProps extends SelectProps {
  options: OptionProps[];
}

const Select = ({ options, ...props }: ISelectProps) => {
  const data = options.map((item, index) => ({
    value: item.id,
    label: item.name,
    isLastOption: index === options.length - 1,
  }));

  return (
    <MantineSelect
      data={data}
      checkIconPosition="right"
      rightSection={<IconChevronDown size={16} />}
      classNames={{ input: "truncate" }}
      {...props}
    />
  );
};

export default Select;
