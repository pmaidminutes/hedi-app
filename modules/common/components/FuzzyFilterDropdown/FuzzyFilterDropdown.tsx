import React from "react";
import { ComboBox } from "carbon-components-react";
import {
  transformFuzzyFilterDropdown,
  IFuzzyFilterProps,
} from "./transformFuzzyFilterDropdown";
import { useFuzzyFilter } from "./useFuzzyFilter";

export const FuzzyFilterDropdown = (props: IFuzzyFilterProps) => {
  const { items, ...rest } = transformFuzzyFilterDropdown(props);
  const { fuzzyItems, handleInputChange } = useFuzzyFilter(items);
  return (
    <ComboBox
      {...rest}
      items={fuzzyItems}
      itemToString={item => (item ? item.label : "")}
      onInputChange={(inputValue: string | undefined) =>
        handleInputChange(inputValue)
      }
    />
  );
};
