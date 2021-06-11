import { HTML, IComponent } from "./Component";
import { getComponentInstance } from "./utils";

export type ToggleKind = "Toggle";

export interface IToggleComponent extends IComponent {
  id: string;
  kind: ToggleKind;
  labelText: HTML;
  labelA?: HTML;
  labelB?: HTML;
  ariaLabel?: string;
}

export const isToggle = (obj: IComponent): obj is IToggleComponent =>
  obj?.kind === "Toggle";

export const isToggleInstance = (
  obj: IComponent,
  id: string
): obj is IToggleComponent => isToggle(obj) && obj.id === id;

export const findToggleInstance = (array: IComponent[], id: string) => {
  const element = array.filter(isToggle).find(item => item.id === id);
  return element;
};

export const getToggleInstance = (
  array: IComponent[],
  id: string,
  fallback: Omit<IToggleComponent, "kind" | "id">
) => getComponentInstance("Toggle", array, id, fallback);
