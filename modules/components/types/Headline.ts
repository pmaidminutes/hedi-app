import { HTML, IComponent } from "./Component";

export type HeadlineKind = "Headline";

export interface IHeadlineComponent extends IComponent {
  kind: HeadlineKind;
  labelKind: string;
  text?: HTML;
}

export const isHeadline = (obj: IComponent): obj is IHeadlineComponent => obj?.kind === "Headline";

export const isLabelInstance = (obj: IComponent, id: string): obj is IHeadlineComponent =>
  isHeadline(obj) && obj.id === id;

export const findHeadlineInstance = (array: IComponent[], id: string) => {
  const element = array.filter(isHeadline).find(item => item.id === id);
  return element;
};
