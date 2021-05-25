import { Notification as INotification } from "@/modules/model/components";
import { ToastNotificationProps } from "carbon-components-react";
import { HTML } from "@/modules/react/html"

export interface IToastNotificationProps
  extends INotification,
    Omit<
      ToastNotificationProps,
      "id" | "subtitle" | "title" | "kind" | "caption"
    > {}

export function transformToastNotification(props: IToastNotificationProps):ToastNotificationProps {
  const {
    kind,
    notificationKind,
    caption,
    lowContrast,
    hideCloseButton,
    title,
    subtitle,
    ariaRole,
    ...rest
  } = props;



  // TODO what todo with aria-role?
  // TODO subtitle as html
  return {
    kind: notificationKind,
    caption,
    lowContrast: lowContrast || true,
    hideCloseButton: hideCloseButton || true,
    title,
    subtitle: subtitle,
    ...rest,
  };
}
