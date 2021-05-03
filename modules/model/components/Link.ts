import { HTML, IComponent } from "./Component";

export type LinkKind = "Link";

export interface Link extends IComponent {
  kind: LinkKind;
  route: string;
  labelText: HTML;
  ariaLabel?: string;
}

export const isLink = (obj: IComponent): obj is Link =>
  obj?.id === typeof "string" && obj?.kind === "Link";

export const isLinkInstance = (obj: IComponent, id: string): obj is Link =>
  isLink(obj) && obj.id === id;
