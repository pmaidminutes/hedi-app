import { FileFields, IFile } from "@/modules/model/IFile";

export interface IImage extends IFile {
  alt: string;
  width: number;
  height: number;
  color: string;
}

export const ImageGQL = `... on Image {
  ${FileFields}
  alt
  width
  height
  color
}`;
