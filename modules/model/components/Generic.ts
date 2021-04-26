import { HTML, IComponent } from "./Component";

export type GenericKind = "Generic";

export interface Generic extends IComponent {
  kind: GenericKind;
  usage: string;
  labelText?: HTML;
  text?: HTML;
  ariaLabel?: string;
}

export const isGeneric = (obj: IComponent): obj is Generic =>
  obj?.id === typeof "string" && obj?.kind === "Generic";

export const isGenericInstance = (
  obj: IComponent,
  id: string
): obj is Generic => isGeneric(obj) && obj.id === id;
