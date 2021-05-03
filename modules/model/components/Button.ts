import { HTML, IComponent } from "./Component";

export type ButtonKind = "Button";

export interface Button extends IComponent {
  kind: ButtonKind;
  buttonKind: string;
  usage: string;
  text?: HTML;
  iconDescription?: string;
  labelText?: HTML;
  ariaLabel?: string;
}

export const isButton = (obj: IComponent): obj is Button =>
  obj?.id === typeof "string" && obj?.kind === "Button";

export const isButtonInstance = (obj: IComponent, id: string): obj is Button =>
  isButton(obj) && obj.id === id;
