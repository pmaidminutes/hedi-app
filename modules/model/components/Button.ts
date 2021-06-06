import { HTML, IComponent } from "./Component";

export type ButtonKind = "Button";

export interface Button extends IComponent {
  kind: ButtonKind;
  type?: "button" | "submit" | "reset";
  buttonKind: string;
  href?: string;
  usage: string;
  text?: HTML;
  iconDescription?: string;
  labelText?: HTML;
  ariaLabel?: string;
}

export const isButton = (obj: IComponent): obj is Button =>
  typeof obj?.id === "string" && obj?.kind === "Button";

export const isButtonInstance = (obj: IComponent, id: string): obj is Button =>
  isButton(obj) && obj.id === id;

export const findButtonInstance = (array: IComponent[], id: string) => {
  const element = array.filter(isButton).find(item => item.id === id);
  return element;
};
