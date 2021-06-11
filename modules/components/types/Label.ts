import { HTML, IComponent } from "./Component";
import { getComponentInstance } from "./utils";

export type LabelKind = "Label";

export interface ILabelComponent extends IComponent {
  kind: LabelKind;
  labelKind: string;
  text?: HTML;
  className?: string;
}

export const isLabel = (obj: IComponent): obj is ILabelComponent =>
  obj?.kind === "Label";

export const isLabelInstance = (
  obj: IComponent,
  id: string
): obj is ILabelComponent => isLabel(obj) && obj.id === id;

export const findLabelInstance = (array: IComponent[], id: string) => {
  const element = array.filter(isLabel).find(item => item.id === id);
  return element;
};

export const findHeadlineLabel = (array: IComponent[]) => {
  const element = array.filter(isLabel).find(item => item.labelKind == "h1");
  return element;
};

export const getLabelInstance = (
  array: IComponent[],
  id: string,
  fallback: Omit<ILabelComponent, "kind" | "id">
) => getComponentInstance("Label", array, id, fallback);
