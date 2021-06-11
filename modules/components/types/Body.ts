import { HTML, IComponent } from "./Component";
import { getComponentInstance } from "./utils";

export type BodyKind = "Body";

export interface IBodyComponent extends IComponent {
  kind: BodyKind;
  body?: HTML;
}

export const isBody = (obj: IComponent): obj is IBodyComponent =>
  obj.kind === "Body";

export const isBodyInstance = (
  obj: IComponent,
  id: string
): obj is IBodyComponent => isBody(obj) && obj.id === id;

export const findBodyInstance = (array: IComponent[], id: string) => {
  const element = array.filter(isBody).find(item => item.id === id);
  return element;
};

export const getBodyInstance = (
  array: IComponent[],
  id: string,
  fallback: Omit<IBodyComponent, "kind" | "id">
) => getComponentInstance("Body", array, id, fallback);
