import { HTML, IComponent } from "./Component";

export type ImageKind = "Image";

export interface Image extends IComponent {
  kind: ImageKind;
  route: string;
  labelText: HTML;
  usage?: string;
  alt?: string;
  width?: number;
  height?: number;
}

export const isImage = (obj: IComponent): obj is Image =>
  typeof obj?.id === "string" && obj?.kind === "Image";

export const isImageInstance = (obj: IComponent, id: string): obj is Image =>
  isImage(obj) && obj.id === id;

export const findImageInstance = (array: IComponent[], id: string) => {
  const image = array.filter(isImage).find(item => item.id === id);
  return image;
};
