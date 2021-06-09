import { createElement } from "react";
import { ILabelComponent } from "../../../types";
import { HTML } from "@/modules/react/html";

// TODO labelKind vielleicht nur valid html Elemente
export const Label = (props: ILabelComponent) => {
  const { text, labelKind, className } = props;
  if (!text) return null;

  return createElement(labelKind, { className }, HTML({ data: text }));
};
