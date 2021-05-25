import { HTML, IComponent } from "./Component";
import { NotificationKind as CarbonNotificationType } from "carbon-components-react";
export type NotificationKind = "Notification";

export interface Notification extends IComponent {
  kind: NotificationKind;
  notificationKind: CarbonNotificationType;
  title: string;
  subtitle?: HTML;
  caption?: string;
  ariaRole?: string;
}

export const isNotification = (obj: IComponent): obj is Notification =>
  typeof obj?.id === "string" && obj?.kind === "Notification";

export const isNotificationInstance = (
  obj: IComponent,
  id: string
): obj is Notification => isNotification(obj) && obj.id === id;

export const findNotificationInstance = (array: IComponent[], id: string) => {
  const element = array.filter(isNotification).find(item => item.id === id);
  return element;
};
