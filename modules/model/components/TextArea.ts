import { HTML, IComponent } from "./Component";

export type TextAreaKind = "TextArea";

export interface TextArea extends IComponent {
  kind: TextAreaKind;
  labelText?: HTML;
  isRequired?: boolean;
  placeholder?: string;
  helperText?: HTML;
}

export const isTextArea = (obj: IComponent): obj is TextArea =>
  obj?.kind === "TextArea";

export const isTextAreaInstance = (
  obj: IComponent,
  id: string
): obj is TextArea => isTextArea(obj) && obj.id === id;

export const findTextAreaInstance = (array: IComponent[], id: string) => {
  const element = array.filter(isTextArea).find(item => item.id === id);
  return element;
};
