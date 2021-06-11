import { HTML, IComponent } from "./Component";
import { getComponentInstance } from "./utils";

export type ImageKind = "Image";

export interface IImageComponent extends IComponent {
  kind: ImageKind;
  route: string;
  labelText: HTML;
  width: number;
  height: number;
  usage?: string;
  alt?: string;
}

export const isImage = (obj: IComponent): obj is IImageComponent =>
  obj?.kind === "Image";

export const isImageInstance = (
  obj: IComponent,
  id: string
): obj is IImageComponent => isImage(obj) && obj.id === id;

export const findImageInstance = (array: IComponent[], id: string) => {
  const image = array.filter(isImage).find(item => item.id === id);
  return image;
};

export const getImageInstance = (
  array: IComponent[],
  id: string,
  fallback: Omit<IImageComponent, "kind" | "id">
) => getComponentInstance("Image", array, id, fallback);
