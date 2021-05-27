import { createElement } from "react";
import { Label as ILabel } from "@/modules/model/components";
import { HTML } from "@/modules/react/html";

// TODO labelKind vielleicht nur valid html Elemente
export const Label = (props: ILabel) => {
  const { text, labelKind } = props;
  if (!text) return null;
  return createElement(labelKind, {}, HTML({ data: text }));
};
