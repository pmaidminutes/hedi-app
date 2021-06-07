import { Select } from "@/modules/model/components";
import { HTML } from "@/modules/react/html/HTML";
import { SelectProps, SelectItemProps } from "carbon-components-react";

export interface ISelectProps
  extends Select,
    Omit<SelectProps, "labelText" | "helperText" | "size"> {
  useItemIndex?: boolean;
}

export interface ISelectAndItemsProps extends SelectProps {
  selectItems: SelectItemProps[];
}

export function transformSelect(props: ISelectProps): ISelectAndItemsProps {
  const {
    kind,
    labelText,
    helperText,
    size,
    items,
    defaultItem,
    useItemIndex,
    ...rest
  } = props;
  return {
    helperText: HTML({ data: helperText }),
    labelText: HTML({ data: labelText }),
    size: convertToCarbonSize(size),
    defaultValue: defaultItem
      ? useItemIndex
        ? items[defaultItem].index
        : items[defaultItem].label
      : undefined,
    selectItems: items.map(i => ({
      text: i.label,
      value: useItemIndex ? i.index : i.route,
    })),
    ...rest,
  };
}

// HACK carbon typing is not aligned with current online documentation.
// our current version might be not up to date
function convertToCarbonSize(
  size?: "sm" | "md" | "lg"
): "sm" | "xl" | undefined {
  switch (size) {
    case "lg":
      return "xl";
    case "md":
      return undefined;
    default:
      return size;
  }
}
