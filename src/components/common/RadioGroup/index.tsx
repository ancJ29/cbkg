import useTranslation from "@/hooks/useTranslation";
import { Radio, Group } from "@mantine/core";
import classes from "./RadioGroup.module.scss";
import { OptionProps } from "@/types";
interface IRadioGroupProps {
  withAsterisk?: boolean;
  options: OptionProps[];
  label?: string;
  description?: string;
  value?: string;
  onChange?: (value: string) => void;
  classNameBox?: string;
  children?: React.ReactNode;
}

const RadioGroup = ({
  withAsterisk = false,
  options,
  description,
  label,
  value,
  onChange,
  classNameBox,
}: IRadioGroupProps) => {
  const t = useTranslation();

  return (
    <Radio.Group
      withAsterisk={withAsterisk}
      value={value || ""}
      label={label}
      description={description && t(description)}
      onChange={(newValue: string) => {
        onChange && onChange(newValue);
      }}
      classNames={{ label: classes.label }}
    >
      <Group className={classNameBox} mt="xs">
        {options.map((option, index) => (
          <Radio
            key={index}
            label={option.name}
            value={option?.id}
            classNames={{
              label: classes.label,
            }}
          />
        ))}
      </Group>
    </Radio.Group>
  );
};

export default RadioGroup;
