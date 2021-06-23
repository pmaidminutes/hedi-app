import { IActionBarAction, ActionBarType } from "@/modules/editorial/types";
import React from "react";
import {
  VolumeUp16,
  Share16,
  Bookmark16,
  Printer16,
  Language16,
} from "@carbon/icons-react";

export interface IActionBarItem {
  action: IActionBarAction;
}

export const ActionBarItem = (props: IActionBarItem) => {
  const { action } = props;
  const { type, description, handler } = action;

  return (
    <div className="hedi--action-bar__item" onClick={() => handler()}>
      {getIconByType(type)}
      {description}
    </div>
  );
};

const getIconByType = (type: ActionBarType) => {
  switch (type) {
    case "audio":
      return <VolumeUp16 />;
    case "bookmark":
      return <Bookmark16 />;
    case "language":
      return <Language16 />;
    case "print":
      return <Printer16 />;
    case "share":
      return <Share16 />;
  }
};
