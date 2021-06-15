import { ISelectComponent, SelectItem } from "@/modules/components";
import { ComboBoxProps } from "carbon-components-react";
import { convertToCarbonSize } from "../../utils";

export interface IItems extends Omit<SelectItem, "route"> {}

export interface IFuzzyFilterProps
  extends Pick<ISelectComponent,  "helperText" | "size">,
    Omit<
      ComboBoxProps,
      "helperText" | "size" | "items" | "labelText" | "onChange"
    > {
  onChange: (data: { selectedItem: SelectItem | null | undefined }) => void;
  items: IItems[];
}

export function transformFuzzyFilterDropdown(props: IFuzzyFilterProps) {
  const {
    placeholder,
    titleText,
    helperText,
    id,
    items,
    size,
    onChange,
  } = props;

  return {
    helperText,
    size: convertToCarbonSize(size),
    placeholder,
    titleText,
    items: items || [],
    id,
    onChange,
  };
}
