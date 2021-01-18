import { FileFields, IFile } from "@/modules/model/IFile";

export interface IImage extends IFile {
  alt: string;
  width: number;
  height: number;
}

export const ImageFields = `
  ${FileFields}
  alt
  width
  height
`;
