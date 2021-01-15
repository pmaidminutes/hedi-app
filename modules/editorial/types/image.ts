import { IEntityLocalized } from "@/modules/model";

export interface IImage extends IEntityLocalized {
  alt: string;
  width: number;
  height: number;
  mime: string;
}

export const ImageFields = `
  mime
  alt
  route
  width
  height
`;
