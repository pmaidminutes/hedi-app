import React from "react";
import { Button, ToastNotification } from "@/modules/components";
import { Language16, Link16, Link24, Link32 } from "@carbon/icons-react";
import { useCopyToClipboard } from "./useCopyToClipboard";
import {
  transformCopyLinkToClipboard,
  ICopyLinkToClipboard,
} from "./transformCopyLinkToClipboard";
export const CopyLinkToClipboard = (props: ICopyLinkToClipboard) => {
  const {
    transformedLink,
    type,
    size,
    description,
  } = transformCopyLinkToClipboard(props);
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
      ) : type === "icon" ? (
        <div
          className="hedi--copy-to-clipboard__icon"
          onClick={() => addToClipboard()}>
          {size === "sm" ? <Link16 /> : size === "md" ? <Link24 /> : <Link32 />}
        </div>
      ) : (
        <div
          className="hedi--action-bar__item"
          onClick={() => addToClipboard()}>
          <Language16 /> {description && description}
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
