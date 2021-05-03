import { HTML, IComponent } from "./Component";

export type FileKind = "File";

export interface File extends IComponent {
  kind: FileKind;
  route: string;
  labelText: HTML;
  usage?: string;
}

export const isFile = (obj: IComponent): obj is File =>
  obj?.id === typeof "string" && obj?.kind === "File";

export const isFileInstance = (obj: IComponent, id: string): obj is File =>
  isFile(obj) && obj.id === id;
