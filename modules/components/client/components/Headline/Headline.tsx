import { createElement } from "react";
import { IHeadlineComponent } from "../../../types";
import { HTML } from "@/modules/react/html";

// TODO combine with Label maybe
export const Headline = (props: IHeadlineComponent) => {
  const { text, headline } = props;
  const element = headline === "h1" ? "h2" : headline;

  if (!text) return null;

  return createElement(element, {}, HTML({ data: text }));
};
