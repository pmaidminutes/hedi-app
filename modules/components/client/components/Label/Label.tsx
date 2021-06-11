import { createElement } from "react";
import { ILabelComponent } from "../../../types";
import { HTML } from "@/modules/react/html";
import { PartialBy } from "@/modules/common/utils";

// TODO labelKind vielleicht nur valid html Elemente
export const Label = (props: PartialBy<ILabelComponent, "kind" | "id">) => {
  const { text, labelKind, className } = props;
  if (!text) return null;

  return createElement(labelKind, { className }, HTML({ data: text }));
};
