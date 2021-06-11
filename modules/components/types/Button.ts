import { HTML, IComponent } from "./Component";
import { getComponentInstance } from "./utils";

export type ButtonKind = "Button";

export interface IButtonComponent extends IComponent {
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

export const isButton = (obj: IComponent): obj is IButtonComponent =>
  obj?.kind === "Button";

export const isButtonInstance = (
  obj: IComponent,
  id: string
): obj is IButtonComponent => isButton(obj) && obj.id === id;

export const findButtonInstance = (array: IComponent[], id: string) => {
  const element = array.filter(isButton).find(item => item.id === id);
  return element;
};

export const getButtonInstance = (
  array: IComponent[],
  id: string,
  fallback: Omit<IButtonComponent, "kind" | "id">
) => getComponentInstance("Button", array, id, fallback);
