import { HTML, IComponent } from "./Component";

export type CheckboxKind = "Checkbox";

export interface Checkbox extends IComponent {
  kind: CheckboxKind;
  labelText: HTML;
  isRequired?: boolean;
  title?: string;
}

export const isCheckbox = (obj: IComponent): obj is Checkbox =>
  obj?.id === typeof "string" && obj?.kind === "Checkbox";

export const isCheckboxInstance = (
  obj: IComponent,
  id: string
): obj is Checkbox => isCheckbox(obj) && obj.id === id;
