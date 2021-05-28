import { HTML, IComponent } from "./Component";
import { NotificationKind as CarbonNotificationType } from "carbon-components-react";

export type NotificationKind = "ToastNotification" | "InlineNotification";
export interface INotification extends IComponent {
  kind: NotificationKind;
  notificationKind: CarbonNotificationType;
  title: string;
  subtitle?: HTML;
  ariaRole?: string;
}
