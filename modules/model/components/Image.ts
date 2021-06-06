import { HTML, IComponent } from "./Component";

export type ImageKind = "Image";

export interface Image extends IComponent {
  kind: ImageKind;
  route: string;
  labelText: HTML;
  width: number;
  height: number;
  usage?: string;
  alt?: string;
}

export const isImage = (obj: IComponent): obj is Image => obj?.kind === "Image";

export const isImageInstance = (obj: IComponent, id: string): obj is Image =>
  isImage(obj) && obj.id === id;

export const findImageInstance = (array: IComponent[], id: string) => {
  const image = array.filter(isImage).find(item => item.id === id);
  return image;
};
