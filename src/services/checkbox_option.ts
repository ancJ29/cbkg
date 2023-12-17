import { CheckBoxOptions } from "@/types";

export function getCheckedKeys(list: CheckBoxOptions[]) {
  return list
    .filter((item) => item.checked === true)
    .map((item) => item.key);
}
