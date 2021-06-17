import { ISelectComponent, ISelectItem } from "@/modules/components";
import { ComboBoxProps } from "carbon-components-react";
import { convertToCarbonSize } from "../../utils";

export interface IItems extends Omit<ISelectItem, "route"> {}

export interface IFuzzyFilterProps
  extends Pick<ISelectComponent, "helperText" | "size" | "items">,
    Omit<
      ComboBoxProps,
      | "helperText"
      | "size"
      | "labelText"
      | "placeholder"
      | "items"
      | "onChange"
      | "defaultValue"
      | "value"
    > {
  onChange?: (item: ISelectItem) => void;
  defaultValue?: ISelectItem;
  value?: ISelectItem;
}

export function transformFuzzyFilterDropdown(props: IFuzzyFilterProps) {
  const {
    titleText,
    helperText,
    id,
    items,
    size,
    onChange,
    defaultValue,
    value,
  } = props;

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
    value,
  };
}
