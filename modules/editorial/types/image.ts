import { gql } from "@/common/graphql";

export interface IImage {
  alt: string;
  width: number;
  height: number;
  url: string;
}

export const ImageFields = `
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
