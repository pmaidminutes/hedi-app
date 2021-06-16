import React from "react";
import { ComboBox } from "carbon-components-react";
import {
  transformFuzzyFilterDropdown,
  IFuzzyFilterProps,
} from "./transformFuzzyFilterDropdown";
import { useFuzzyFilter } from "./useFuzzyFilter";
import { HTML } from "@/modules/react/html/HTML";

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
    initialValue,
    filter,
  } = useFuzzyFilter(items, onChange, value, defaultValue);
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
      itemToElement={item => {
        if (filter.length > 1) {
          const regEx = new RegExp(filter, "gi");
          const matches = item.label.match(regEx);
          let boldened = item.label;
          matches?.forEach(
            part =>
              (boldened = boldened.replace(
                part,
                "<strong>" + part + "</strong>"
              ))
          );
          return (
            <span>
              <HTML data={boldened} />
            </span>
          );
        }
        return <span>{item.label}</span>;
      }}
    />
  );
};
