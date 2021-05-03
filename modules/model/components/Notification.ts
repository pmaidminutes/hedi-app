import { HTML, IComponent } from "./Component";

export type NotificationKind = "Notification";

export interface Notification extends IComponent {
  kind: NotificationKind;
  notificationKind: string;
  title: string;
  subtitle?: HTML;
  caption?: string;
  ariaRole?: string;
}

export const isNotification = (obj: IComponent): obj is Notification =>
  obj?.id === typeof "string" && obj?.kind === "Notification";

export const isNotificationInstance = (
  obj: IComponent,
  id: string
): obj is Notification => isNotification(obj) && obj.id === id;
