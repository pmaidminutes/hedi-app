import { HTML, IComponent } from "./Component";

export type LinkKind = "Link";

export interface Link extends IComponent {
  kind: LinkKind;
  href: string;
  labelText: HTML;
  ariaLabel?: string;
}

export const isLink = (obj: IComponent): obj is Link =>
  typeof obj?.id === "string" && obj?.kind === "Link";

export const isLinkInstance = (obj: IComponent, id: string): obj is Link =>
  isLink(obj) && obj.id === id;

export const findLinkInstance = (array: IComponent[], id: string) => {
  const element = array.filter(isLink).find(item => item.id === id);
  return element;
};
