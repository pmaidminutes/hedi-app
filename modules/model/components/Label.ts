import { HTML, IComponent } from "./Component";

export type LabelKind = "Label";

export interface Label extends IComponent {
  kind: LabelKind;
  labelKind: string;
  text?: HTML;
}

export const isLabel = (obj: IComponent): obj is Label =>
  typeof obj?.id === "string" && obj?.kind === "Label";

export const isLabelInstance = (obj: IComponent, id: string): obj is Label =>
  isLabel(obj) && obj.id === id;

export const findLabelInstance = (array: IComponent[], id: string) => {
  const element = array.filter(isLabel).find(item => item.id === id);
  return element;
};
