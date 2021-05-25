import { Notification as INotification } from "@/modules/model/components";
import { ToastNotificationProps } from "carbon-components-react";

export interface IToastNotificationProps
  extends INotification,
    Omit<
      ToastNotificationProps,
      "id" | "subtitle" | "title" | "kind" | "caption"
    > {}

export function transformToastNotification(props: IToastNotificationProps) {
  const {
    notificationKind,
    caption,
    lowContrast,
    hideCloseButton,
    title,
    subtitle,
    ariaRole
  } = props;

  return {
    kind: notificationKind,
    caption,
    lowContrast: lowContrast || true,
    hideCloseButton: hideCloseButton || true,
    title,
    subtitle,
    ariaRole
  };
}
