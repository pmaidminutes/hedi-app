import React from "react";
import { OverflowMenuItem } from "carbon-components-react";
import {
  ISelectFieldVisibilityItem,
  transformSelectFieldVisibilityItem,
} from "./transformSelectFieldVisibilityItem";

export const SelectFieldVisibilityItem = (
  props: ISelectFieldVisibilityItem
) => {
  const { itemText, fieldClassName } = transformSelectFieldVisibilityItem(
    props
  );

  return (
    <OverflowMenuItem itemText={itemText} wrapperClassName={fieldClassName} />
  );
};
