import { HTML, IComponent } from "./Component";

export type SvgKind = "Svg";

export interface Svg extends IComponent {
  kind: SvgKind;
  route: string;
  labelText: HTML;
  usage?: string;
}

export const isSvg = (obj: IComponent): obj is Svg =>
  typeof obj?.id === "string" && obj?.kind === "Svg";

export const isSvgInstance = (obj: IComponent, id: string): obj is Svg =>
  isSvg(obj) && obj.id === id;

export const findSvgInstance = (array: IComponent[], id: string) => {
  const element = array.filter(isSvg).find(item => item.id === id);
  return element;
};
