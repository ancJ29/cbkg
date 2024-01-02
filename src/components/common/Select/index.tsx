import { OptionProps } from "@/types";
import { Select as MantineSelect, SelectProps } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import classes from "./Select.module.scss";
interface ISelectProps extends SelectProps {
  options?: OptionProps[];
}

const Select = ({ options, ...props }: ISelectProps) => {
  const data = options?.map(({ value, label }, index) => ({
    value: value.toString(),
    label,
    isLastOption: index === options?.length - 1,
  }));

  return (
    <MantineSelect
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

export default Select;
