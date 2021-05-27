import { ToastNotification as IToastNotification } from "@/modules/model/components";
import { ToastNotificationProps } from "carbon-components-react";
import { HTML } from "@/modules/react/html"

export interface IToastNotificationProps
  extends IToastNotification,
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
  return {
    kind: notificationKind,
    caption,
    lowContrast: lowContrast || true,
    hideCloseButton: hideCloseButton || true,
    title,
    subtitle: HTML({ data: subtitle }),
    ...rest,
  };
}
