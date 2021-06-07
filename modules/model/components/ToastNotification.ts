import { IComponent } from "./Component";
import { INotification } from "./INotification";

export type ToastNotificationKind = "ToastNotification";

export interface ToastNotification extends INotification {
  kind: ToastNotificationKind;
  caption?: string;
}

export const isToastNotification = (
  obj: IComponent
): obj is ToastNotification => obj?.kind === "ToastNotification";

export const isToastNotificationInstance = (
  obj: IComponent,
  id: string
): obj is ToastNotification => isToastNotification(obj) && obj.id === id;

export const findToastNotificationInstance = (
  array: IComponent[],
  id: string
) => {
  const element = array
    .filter(isToastNotification)
    .find(item => item.id === id);
  return element;
};
