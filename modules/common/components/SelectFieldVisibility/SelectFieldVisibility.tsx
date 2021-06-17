import React from "react";
import { OverflowMenu } from "carbon-components-react";
import { SelectFieldVisibilityItem } from "./SelectFieldVisibilityItem/";
import {
  ISelectFieldVisibilty,
  transformSelectFieldVisibilty,
} from "./transformSelectFieldVisibility";

export const SelectFieldVisibility = (props: ISelectFieldVisibilty) => {
  const { items, icon, value } = transformSelectFieldVisibilty(props);
  return (
    <OverflowMenu
      renderIcon={icon}
      className="hedi--field-visibility"
      selectorPrimaryFocus={".locked"}>
      {items.map((item, index) => {
        return (
          <SelectFieldVisibilityItem
            key={item.label + index}
            value={value}
            {...item}
          />
        );
      })}
    </OverflowMenu>
  );
};
