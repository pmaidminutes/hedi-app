import { HTML, IComponent } from "./Component";

export type BodyKind = "Body";

export interface Body extends IComponent {
  kind: BodyKind;
  body?: HTML;
}

export const isBody = (obj: IComponent): obj is Body => obj.kind === "Body";

export const isBodyInstance = (obj: IComponent, id: string): obj is Body =>
  isBody(obj) && obj.id === id;

export const findBodyInstance = (array: IComponent[], id: string) => {
  const element = array.filter(isBody).find(item => item.id === id);
  return element;
};
