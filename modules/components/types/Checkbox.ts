import { HTML, IComponent } from "./Component";
import { getComponentInstance } from "./utils";

export type CheckboxKind = "Checkbox";

export interface ICheckboxComponent extends IComponent {
  id: string;
  kind: CheckboxKind;
  labelText: HTML;
  isRequired?: boolean;
  title?: string;
}

export const isCheckbox = (obj: IComponent): obj is ICheckboxComponent =>
  obj?.kind === "Checkbox";

export const isCheckboxInstance = (
  obj: IComponent,
  id: string
): obj is ICheckboxComponent => isCheckbox(obj) && obj.id === id;

export const findCheckboxInstance = (array: IComponent[], id: string) => {
  const element = array.filter(isCheckbox).find(item => item.id === id);
  return element;
};

export const getCheckboxInstance = (
  array: IComponent[],
  id: string,
  fallback: Omit<ICheckboxComponent, "kind" | "id">
) => getComponentInstance("Checkbox", array, id, fallback);
