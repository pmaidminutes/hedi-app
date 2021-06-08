import { createElement } from "react";
import { IHeadlineComponent } from "../../../types";
import { HTML } from "@/modules/react/html";

// TODO combine with Label maybe
export const Headline = (props: IHeadlineComponent) => {
  const { text, labelKind } = props;
  if (!text) return null;

  return createElement(labelKind, HTML({ data: text }));
};
