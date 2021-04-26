import { HTML, IComponent } from "./Component";

export type ToggleKind = "Toggle";

export interface Toggle extends IComponent {
  kind: ToggleKind;
  labelText: HTML;
  labelA?: HTML;
  labelB?: HTML;
  ariaLabel?: string;
}

export const isToggle = (obj: IComponent): obj is Toggle =>
  obj?.id === typeof "string" && obj?.kind === "Toggle";

export const isToggleInstance = (obj: IComponent, id: string): obj is Toggle =>
  isToggle(obj) && obj.id === id;
