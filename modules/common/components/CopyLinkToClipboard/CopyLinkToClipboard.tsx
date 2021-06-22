import React from "react";
import { Button, ToastNotification } from "@/modules/components";
import { Link16, Link24, Link32 } from "@carbon/icons-react";
import { useCopyToClipboard } from "./useCopyToClipboard";
import {
  transformCopyLinkToClipboard,
  ICopyLinkToClipboard,
} from "./transformCopyLinkToClipboard";
export const CopyLinkToClipboard = (props: ICopyLinkToClipboard) => {
  const { transformedLink, type, size } = transformCopyLinkToClipboard(props);
  const {
    addToClipboard,
    hasNotification,
    notificationData,
  } = useCopyToClipboard(transformedLink);

  return (
    <div className="hedi--copy-to-clipboard">
      {type === "button" ? (
        <Button
          iconDescription="Copy to Clipboard"
          buttonKind="ghost"
          hasIconOnly
          renderIcon={Link32}
          onClick={() => addToClipboard()}
        />
      ) : (
        <div
          className="hedi--copy-to-clipboard__icon"
          onClick={() => addToClipboard()}>
          {size === "sm" ? <Link16 /> : size === "md" ? <Link24 /> : <Link32 />}
        </div>
      )}
      {hasNotification && (
        <ToastNotification
          className="hedi--notification__toast--absolute"
          notificationKind="info"
          {...notificationData}
        />
      )}
    </div>
  );
};
