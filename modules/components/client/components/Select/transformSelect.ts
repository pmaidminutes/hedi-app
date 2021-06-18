import { ISelectComponent } from "../../../types";
import { HTML } from "@/modules/react/html/HTML";
import { SelectProps, SelectItemProps } from "carbon-components-react";
import { convertToCarbonSize, PartialBy } from "@/modules/common/utils";

export interface ISelectProps
  extends PartialBy<ISelectComponent, "kind">,
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

