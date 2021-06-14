import React from "react";
import { IArticleAction } from "../../../types";
import { transformAsideAction } from "./transformAsideAction";
export const AsideAction = (props: IArticleAction) => {
  const { handler, description, svgElement } = transformAsideAction(props);

  return (
    <button
      className="hedi--article--aside__actions--element"
      onClick={() => handler()}>
      {svgElement}
      {description}
    </button>
  );
};
