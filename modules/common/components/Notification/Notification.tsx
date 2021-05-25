import React from "react";
import {
  InlineNotification,
  IInlineNotificationProps,
} from "./InlineNotification";
import {
  ToastNotification,
  IToastNotificationProps,
} from "./ToastNotification";

export const Notification = (
  props: IInlineNotificationProps | IToastNotificationProps
) => {
  const { notificationType } = props;
  switch (notificationType) {
    case "inline":
      return <InlineNotification {...props} />;
    case "toast":
      return <ToastNotification {...props} />;
    default:
      return null;
  }
};
