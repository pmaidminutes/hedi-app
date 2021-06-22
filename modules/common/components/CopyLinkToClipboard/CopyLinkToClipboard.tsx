import React from "react";
import { Button, ToastNotification } from "@/modules/components";
import { Link32 } from "@carbon/icons-react";
import { useCopyToClipboard } from "./useCopyToClipboard";
import {
  transformCopyLinkToClipboard,
  ICopyLinkToClipboard,
} from "./transformCopyLinkToClipboard";
export const CopyLinkToClipboard = (props: ICopyLinkToClipboard) => {
  const { transformedLink } = transformCopyLinkToClipboard(props);
  const {
    addToClipboard,
    hasNotification,
    notificationData,
  } = useCopyToClipboard(transformedLink);

  return (
    <>
      <Button
        iconDescription="Copy to Clipboard"
        buttonKind="ghost"
        hasIconOnly
        renderIcon={Link32}
        onClick={() => addToClipboard()}
      />
      {hasNotification && (
        <ToastNotification
          className="hedi--notification__toast--absolute"
          notificationKind="info"
          {...notificationData}
        />
      )}
    </>
  );
};
