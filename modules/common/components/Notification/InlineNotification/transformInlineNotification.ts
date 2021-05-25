import { Notification as INotification } from "@/modules/model/components";
import { InlineNotificationProps } from "carbon-components-react";

export interface IInlineNotificationProps
  extends INotification,
    Omit<
      InlineNotificationProps,
      "id" | "subtitle" | "title" | "kind" 
    > {}

export function transformInlineNotification(props: IInlineNotificationProps) {
  const {
    title,
    subtitle,
    notificationKind,
    lowContrast,
    hideCloseButton,
    ariaRole,
  } = props;

  return {
    kind: notificationKind,
    title,
    subtitle,
    lowContrast: lowContrast || true,
    hideCloseButton: hideCloseButton || true,
    ariaRole,
  };
}
