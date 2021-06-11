import { HTML, IComponent } from "./Component";
import { getComponentInstance } from "./utils";

export type GenericKind = "Generic";

export interface IGenericComponent extends IComponent {
  kind: GenericKind;
  usage: string;
  labelText?: HTML;
  text?: HTML;
  ariaLabel?: string;
}

export const isGeneric = (obj: IComponent): obj is IGenericComponent =>
  obj?.kind === "Generic";

export const isGenericInstance = (
  obj: IComponent,
  id: string
): obj is IGenericComponent => isGeneric(obj) && obj.id === id;

export const findGenericInstance = (array: IComponent[], id: string) => {
  const element = array.filter(isGeneric).find(item => item.id === id);
  return element;
};

export const getGenericInstance = (
  array: IComponent[],
  id: string,
  fallback: Omit<IGenericComponent, "kind" | "id">
) => getComponentInstance("Generic", array, id, fallback);
