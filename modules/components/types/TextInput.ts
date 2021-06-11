import { HTML, IComponent } from "./Component";
import { getComponentInstance } from "./utils";

export type TextInputKind = "TextInput";

export interface ITextInputComponent extends IComponent {
  id: string;
  kind: TextInputKind;
  type: "text" | "email" | "password";
  labelText: HTML;
  isRequired?: boolean;
  placeholder?: string;
  helperText?: HTML;
  ariaLabel?: string;
}

export const isTextInput = (obj: IComponent): obj is ITextInputComponent =>
  obj?.kind === "TextInput";

export const isTextInputInstance = (
  obj: IComponent,
  id: string
): obj is ITextInputComponent => isTextInput(obj) && obj.id === id;

export const findTextInputInstance = (array: IComponent[], id: string) => {
  const element = array.filter(isTextInput).find(item => item.id === id);
  return element;
};

export const getTextInputInstance = (
  array: IComponent[],
  id: string,
  fallback: Omit<ITextInputComponent, "kind" | "id">
) => getComponentInstance("TextInput", array, id, fallback);
