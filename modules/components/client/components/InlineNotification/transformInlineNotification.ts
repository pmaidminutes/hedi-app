import { InlineNotification as IInlineNotification } from "@/modules/model/components";
import { HTML } from "@/modules/react/html/HTML";
import { InlineNotificationProps } from "carbon-components-react";

export interface IInlineNotificationProps
  extends IInlineNotification,
    Omit<InlineNotificationProps, "id" | "subtitle" | "title" | "kind"> {}

export function transformInlineNotification(
  props: IInlineNotificationProps
): InlineNotificationProps {
  const {
    title,
    subtitle,
    notificationKind,
    lowContrast,
    hideCloseButton,
  } = props;

  // TODria-roleO how to handle a
  return {
    kind: notificationKind,
    title,
    subtitle: HTML({ data: subtitle }),
    lowContrast: lowContrast || true,
    hideCloseButton: hideCloseButton || true,
  };
}
