import { gql } from "@/common/graphql";
import {
  EditorialFields,
  EntityFields,
  IEditorial,
  IEntity,
  ILocalizedEntity,
  ISummary,
  LocalizedEntityFields,
  SummaryFields,
} from "@/common/model/cms";
import { AudioFields, IAudio } from "./audio";
import { IImage, ImageFields } from "./image";
export interface IArticleEntry extends ILocalizedEntity, ISummary {}

export const ArticleEntryFields = `${LocalizedEntityFields}
${SummaryFields}`;

export const ArticleEntryFrag = gql`
fragment ArticleEntryFrag on Article {
  ${ArticleEntryFields}
}
`;

export interface IArticle extends IArticleEntry, IEditorial<ILocalizedEntity> {
  image: IImage;
  audio: IAudio;
  category: IEntity;
}

export function isIArticle(obj: any): obj is IArticle {
  return obj && obj.typeName === "Article";
}

export const ArticleFields = `${EditorialFields}
category { ${EntityFields} }
image { ${ImageFields} }
audio { ${AudioFields} }`;

export const ArticleFrag = gql`
fragment ArticleFrag on Article {
  ${ArticleFields} 
}
`;
