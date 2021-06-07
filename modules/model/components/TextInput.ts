import { HTML, IComponent } from "./Component";

export type TextInputKind = "TextInput";

export interface TextInput extends IComponent {
  id: string;
  kind: TextInputKind;
  type: "text" | "email" | "password";
  labelText: HTML;
  isRequired?: boolean;
  placeholder?: string;
  helperText?: HTML;
  ariaLabel?: string;
}

export const isTextInput = (obj: IComponent): obj is TextInput =>
  obj?.kind === "TextInput";

export const isTextInputInstance = (
  obj: IComponent,
  id: string
): obj is TextInput => isTextInput(obj) && obj.id === id;

export const findTextInputInstance = (array: IComponent[], id: string) => {
  const element = array.filter(isTextInput).find(item => item.id === id);
  return element;
};
