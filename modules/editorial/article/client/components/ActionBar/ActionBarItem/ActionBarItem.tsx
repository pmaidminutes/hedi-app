import {
  ActionBarType,
  IArticleAction,
} from "@/modules/editorial/article/types";
import React from "react";
import {
  VolumeUp16,
  Share16,
  Bookmark16,
  Printer16,
  Language16,
} from "@carbon/icons-react";
import { CopyLinkToClipboard } from "@/modules/common/components";

export const ActionBarItem = (props: IArticleAction) => {
  const { type, description, handler } = props;

  if (type === "copylink") {
    return (
      <CopyLinkToClipboard
        size="sm"
        type="actionbaritem"
        description="Limo trinken"
      />
    );
  }

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
