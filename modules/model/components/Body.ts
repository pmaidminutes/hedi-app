import { HTML, IComponent } from "./Component";

export type BodyKind = "Body";

export interface Body extends IComponent {
  kind: BodyKind;
  body?: HTML;
}

export const isBody = (obj: IComponent): obj is Body =>
  obj?.id === typeof "string" && obj.kind === "Body";

export const isBodyInstance = (obj: IComponent, id: string): obj is Body =>
  isBody(obj) && obj.id === id;
