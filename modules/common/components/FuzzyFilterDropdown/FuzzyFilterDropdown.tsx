import React from "react";
import { ComboBox } from "carbon-components-react";
import {
  transformFuzzyFilterDropdown,
  IFuzzyFilterProps,
} from "./transformFuzzyFilterDropdown";
import { useFuzzyFilter } from "./useFuzzyFilter";

export const FuzzyFilterDropdown = (props: IFuzzyFilterProps) => {
  const {
    items,
    onChange,
    value,
    defaultValue,
    ...rest
  } = transformFuzzyFilterDropdown(props);
  const {
    fuzzyItems,
    handleInputChange,
    handleChange,
    fuzzyValue,
    initialValue,
  } = useFuzzyFilter(items, onChange, value, defaultValue);
  console.log({ fuzzyValue });
  return (
    <ComboBox
      {...rest}
      items={fuzzyItems}
      onInputChange={(inputValue: string | undefined) =>
        handleInputChange(inputValue)
      }
      onChange={({ selectedItem }) => {
        if (selectedItem) handleChange(selectedItem);
      }}
      initialSelectedItem={initialValue}
    />
  );
};
