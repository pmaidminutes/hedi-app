import React from "react";
import { IArticleAction } from "../../../types";

export function transformAsideAction(props: IArticleAction) {
  const { icon, description, handler } = props;

  const svgElement = !icon
    ? null
    : /*#__PURE__*/ React.createElement(icon, {
        "aria-label": description,
        className: "bx--btn__icon",
        "aria-hidden": "true",
      });

  return { handler, description, svgElement };
}
