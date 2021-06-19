import { IImage } from "@/modules/editorial/types";
import { HTML, IComponent } from "./Component";
import { findComponentInstance, getComponentInstance } from "./utils";

export type ImageKind = "Image";

export interface IImageComponent extends IComponent {
  kind: ImageKind;
  route: string;
  labelText: HTML;
  width: number;
  height: number;
  usage?: string;
  alt?: string;
  color?: string;
}

export const isImage = (obj: IComponent): obj is IImageComponent =>
  obj?.kind === "Image";

export const isImageInstance = (
  obj: IComponent,
  id: string
): obj is IImageComponent => isImage(obj) && obj.id === id;

export const findImageInstance = (array: IComponent[], id: string) =>
  findComponentInstance<IImageComponent>("Image", array, id);

export const getImageInstance = (
  array: IComponent[],
  id: string,
  fallback: Omit<IImageComponent, "kind" | "id">
) => getComponentInstance("Image", array, id, fallback);

export const imageToImageComponent = (img?: IImage): IImageComponent | null => {
  if (!img) return null;
  const kind = "Image";
  const labelText = img.label;
  return { kind, labelText, ...img } as IImageComponent;
};
