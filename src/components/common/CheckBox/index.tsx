import { UseListStateHandlers } from "@mantine/hooks";
import { Checkbox as CheckBoxMantine, Flex } from "@mantine/core";
import { CheckBoxOptions } from "@/types";

const CheckBox = ({
  multiple = false,
  values,
  handlers,
}: {
  multiple?: boolean;
  values: CheckBoxOptions[];
  handlers: UseListStateHandlers<CheckBoxOptions>;
}) => {
  const allChecked = values.every((value) => value.checked);

  const indeterminate =
    values.some((value) => value.checked) && !allChecked;

  const items = values.map((value, index) => (
    <CheckBoxMantine
      label={value.label}
      key={value.key}
      checked={value.checked}
      onChange={(event) =>
        handlers.setItemProp(
          index,
          "checked",
          event.currentTarget.checked,
        )
      }
    />
  ));

  return (
    <Flex direction="column" gap={10}>
      {multiple && (
        <CheckBoxMantine
          checked={allChecked}
          indeterminate={indeterminate}
          label="All"
          onChange={() =>
            handlers.setState((current) =>
              current.map((value) => ({
                ...value,
                checked: !allChecked,
              })),
            )
          }
        />
      )}
      {items}
    </Flex>
  );
};
export default CheckBox;
