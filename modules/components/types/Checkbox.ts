import { HTML, IComponent } from "./Component";

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
