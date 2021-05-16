import { HTML, IComponent } from "./Component";

export type NotificationKind = "ToastNotification" | "InlineNotification";

export interface INotification extends IComponent {
  kind: NotificationKind;
  notificationKind:
    | "error"
    | "info"
    | "info-square"
    | "success"
    | "warning"
    | "warning-alt";
  title: string;
  subtitle?: HTML;
  ariaRole?: string;
}
