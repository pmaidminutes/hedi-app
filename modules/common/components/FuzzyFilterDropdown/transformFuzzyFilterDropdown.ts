import { ISelectComponent, SelectItem } from "@/modules/components";
import { ComboBoxProps } from "carbon-components-react";
import { convertToCarbonSize } from "../../utils";

export interface IItems extends Omit<SelectItem, "route"> {}

export interface IFuzzyFilterProps
  extends Pick<ISelectComponent, "helperText" | "size" | "items">,
    Omit<
      ComboBoxProps,
      "helperText" | "size" | "labelText" | "placeholder" | "items" | "onChange" | "defaultValue" | "value"
    > {
  onChange?: (item: SelectItem) => void;
  defaultValue?: SelectItem;
  value?: SelectItem;
}

export function transformFuzzyFilterDropdown(props: IFuzzyFilterProps) {
  const { titleText, helperText, id, items, size, onChange, defaultValue, value } = props;

  return {
    placeholder: helperText || "Text",
    helperText,
    size: convertToCarbonSize(size),
    titleText,
    items: items || [],
    id,
    onChange,
    ariaLabel: helperText || "Choose an item",
    defaultValue,
    value
  };
}
