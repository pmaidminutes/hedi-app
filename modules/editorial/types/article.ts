import { gql } from "@/common/graphql";
import {
  BodyFields,
  URLPathFields,
  IBody,
  IEditorial,
  IEntity,
  IURLPath,
  EditorialFields,
  EntityFields,
  isITranslatable,
  ITranslatable,
  TranslatableFields,
  ITranslations,
} from "@/common/model/cms";
import { ImageFields, IImage } from "./image";

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
  translations(excludeSelf: $excludeSelf) {
    ${ArticleEntryFields}
  }
`;

export const ArticleFrag = gql`
fragment ArticleFrag on Article {
  ${ArticleFields} 
}
`;
