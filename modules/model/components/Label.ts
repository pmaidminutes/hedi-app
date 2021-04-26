import { HTML, IComponent } from "./Component";

export type LabelKind = "Label";

export interface Label extends IComponent {
  kind: LabelKind;
  labelKind: string;
  text?: HTML;
}

export const isLabel = (obj: IComponent): obj is Label =>
  obj?.id === typeof "string" && obj?.kind === "Label";

export const isLabelInstance = (obj: IComponent, id: string): obj is Label =>
  isLabel(obj) && obj.id === id;
