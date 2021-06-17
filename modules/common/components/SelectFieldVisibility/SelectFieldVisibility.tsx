import React from "react";
import { OverflowMenu } from "carbon-components-react";
import { SelectFieldVisibilityItem } from "./SelectFieldVisibilityItem/";
import {
  ISelectFieldVisibilty,
  transformSelectFieldVisibilty,
} from "./transformSelectFieldVisibility";
import { useSelectFieldVisibility } from "./useSelectFieldVisibility";
export const SelectFieldVisibility = (props: ISelectFieldVisibilty) => {
  const { items, value, onChange } = transformSelectFieldVisibilty(props);
  const {
    initialValue,
    handleChange,
    currentValue,
    icon,
  } = useSelectFieldVisibility(value, onChange);
  return (
    <OverflowMenu
      renderIcon={icon}
      className="hedi--field-visibility"
      selectorPrimaryFocus={".locked"}>
      {items.map((item, index) => {
        return (
          <SelectFieldVisibilityItem
            key={item.label + index}
            value={currentValue || initialValue}
            onChange={handleChange}
            {...item}
          />
        );
      })}
    </OverflowMenu>
  );
};
