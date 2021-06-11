import { IComponent } from "./Component";
import { INotification } from "./INotification";
import { getComponentInstance } from "./utils";

export type ToastNotificationKind = "ToastNotification";

export interface IToastNotificationComponent extends INotification {
  kind: ToastNotificationKind;
  caption?: string;
}

export const isToastNotification = (
  obj: IComponent
): obj is IToastNotificationComponent => obj?.kind === "ToastNotification";

export const isToastNotificationInstance = (
  obj: IComponent,
  id: string
): obj is IToastNotificationComponent =>
  isToastNotification(obj) && obj.id === id;

export const findToastNotificationInstance = (
  array: IComponent[],
  id: string
) => {
  const element = array
    .filter(isToastNotification)
    .find(item => item.id === id);
  return element;
};

export const getToastNotificationInstance = (
  array: IComponent[],
  id: string,
  fallback: Omit<IToastNotificationComponent, "kind" | "id">
) => getComponentInstance("ToastNotification", array, id, fallback);
