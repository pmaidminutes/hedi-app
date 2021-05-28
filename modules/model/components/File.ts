import { HTML, IComponent } from "./Component";

export type FileKind = "File";

export interface File extends IComponent {
  kind: FileKind;
  route: string;
  labelText: HTML;
  usage?: string;
  mimeType?: string;
}

export const isFile = (obj: IComponent): obj is File =>
  typeof obj?.id === "string" && obj?.kind === "File";

export const isFileInstance = (obj: IComponent, id: string): obj is File =>
  isFile(obj) && obj.id === id;

export const findFileInstance = (array: IComponent[], id: string) => {
  const element = array.filter(isFile).find(item => item.id === id);
  return element;
};
