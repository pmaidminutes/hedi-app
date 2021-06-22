import React from "react";
import { Button, ToastNotification } from "@/modules/components";
import { Link32 } from "@carbon/icons-react";
import { useCopyToClipboard } from "./useCopyToClipboard";
import {
  transformCopyLinkToClipboard,
  ICopyLinkToClipboard,
} from "./transformCopyLinkToClipboard";
export const CopyLinkToClipboard = (props: ICopyLinkToClipboard) => {
  const { transformedLink, type } = transformCopyLinkToClipboard(props);
  const {
    addToClipboard,
    hasNotification,
    notificationData,
  } = useCopyToClipboard(transformedLink);

  return (
    <>
      {type === "button" ? (
        <Button
          iconDescription="Copy to Clipboard"
          buttonKind="ghost"
          hasIconOnly
          renderIcon={Link32}
          onClick={() => addToClipboard()}
        />
      ) : (
        <Link32
          className="hedi--copy-to-clipboard__icon"
          onClick={() => addToClipboard()}
        />
      )}
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
