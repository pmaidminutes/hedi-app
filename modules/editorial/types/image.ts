import { gql } from "@/common/graphql";
import {
  IEntity,
  ITranslatable,
  EntityFields,
  TranslatableFields,
} from "@/common/model/cms";

export interface IImage extends ITranslatable, IEntity {
  alt: string;
  width: number;
  height: number;
  url: string;
}

export const ImageFields = `
  ${EntityFields}
  ${TranslatableFields}
  alt
  url
  width
  height
`;

export const ImageFrag = gql`
fragment FImage on Image {
  ${ImageFields}
}
`;
