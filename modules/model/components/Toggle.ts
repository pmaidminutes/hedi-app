import { HTML, IComponent } from "./Component";

export type ToggleKind = "Toggle";

export interface Toggle extends IComponent {
  id: string;
  kind: ToggleKind;
  labelText: HTML;
  labelA?: HTML;
  labelB?: HTML;
  ariaLabel?: string;
}

export const isToggle = (obj: IComponent): obj is Toggle =>
  obj?.kind === "Toggle";

export const isToggleInstance = (obj: IComponent, id: string): obj is Toggle =>
  isToggle(obj) && obj.id === id;

export const findToggleInstance = (array: IComponent[], id: string) => {
  const element = array.filter(isToggle).find(item => item.id === id);
  return element;
};
