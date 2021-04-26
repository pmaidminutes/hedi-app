import { HTML, IComponent } from "./Component";

export type TextInputKind = "TextInput";

export interface TextInput extends IComponent {
  kind: TextInputKind;
  labelText?: HTML;
  isRequired?: boolean;
  placeholder?: string;
  helperText?: HTML;
  ariaLabel?: string;
}

export const isTextInput = (obj: IComponent): obj is TextInput =>
  obj?.id === typeof "string" && obj?.kind === "TextInput";

export const isTextInputInstance = (
  obj: IComponent,
  id: string
): obj is TextInput => isTextInput(obj) && obj.id === id;
