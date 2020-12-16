import { gql } from "@/common/graphql";
import {
  BodyFields,
  EditorialFields,
  EntityFields,
  IBody,
  IEditorial,
  IEntity,
  ITranslatable,
  ITranslations,
  IURLPath,
  TranslatableFields,
  URLPathFields,
} from "@/common/model/cms";
import { AudioFields, IAudio } from "./audio";
import { IImage, ImageFields } from "./image";
export interface IArticleEntry
  extends IEntity,
    IURLPath,
    ITranslatable,
    IBody {}

export const ArticleEntryFields = `
  ${EntityFields}
  ${URLPathFields}
  ${TranslatableFields}
  ${BodyFields}
  image {
    ${ImageFields}
  }
  audio
  {
    ${AudioFields}
  }
`;

export const ArticleEntryFrag = gql`
fragment ArticleEntryFrag on Article {
  ${ArticleEntryFields}
}
`;

export interface IArticle
  extends IArticleEntry,
    IEditorial,
    ITranslations<IArticleEntry> {
  image: IImage;
  audio: IAudio;
  category: IEntity;
  translations: IArticleEntry[];
}

export function isIArticle(obj: any): obj is IArticle {
  return obj && obj.typeName === "Article";
}

export const ArticleFields = `
  ${EditorialFields}
  urlpath
  category {
    ${EntityFields}
  }
  image {
    ${ImageFields}
  }
  audio
  {
    ${AudioFields}
  }
  translations(excludeSelf: $excludeSelf) {
    ${ArticleEntryFields}
  }
`;

export const ArticleFrag = gql`
fragment ArticleFrag on Article {
  ${ArticleFields} 
}
`;
