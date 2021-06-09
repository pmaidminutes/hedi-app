import { HTML, IComponent } from "./Component";

export type HeadlineKind = "Headline";

export interface IHeadlineComponent extends IComponent {
  kind: HeadlineKind;
  headline: "h1" | "h2" | "h3" | "h4" | "h5";
  text?: HTML;
}

export const isHeadline = (obj: IComponent): obj is IHeadlineComponent =>
  obj?.kind === "Headline";

export const isHeadlineInstance = (
  obj: IComponent,
  id: string
): obj is IHeadlineComponent => isHeadline(obj) && obj.id === id;

export const findHeadlineInstance = (array: IComponent[], id: string) => {
  const element = array.filter(isHeadline).find(item => item.id === id);
  return element;
};

export const findAllHeadlineInstances = (array: IComponent[]) => {
  return array.filter(isHeadline);
};
