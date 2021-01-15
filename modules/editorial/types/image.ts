import { IEntityLocalized } from "@/modules/model";

export interface IImage extends IEntityLocalized {
  alt: string;
  width: number;
  height: number;
}

export const ImageFields = `
  alt
  route
  width
  height
`;
