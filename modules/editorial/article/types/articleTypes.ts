import { gql } from "@/modules/graphql";
import {
  EditorialFields,
  EntityFields,
  IEditorial,
  IEntity,
  IEntityLocalized,
  ISummary,
  EntityLocalizedFields,
  SummaryFields,
  IAppStyled,
  IRouteLabeled,
  RouteLabelFields,
} from "@/modules/model";
import { AudioFields, IAudio } from "@/modules/editorial/types/audio";
import { IImage, ImageFields } from "@/modules/editorial/types/image";
export interface IArticleEntry extends IEntityLocalized, ISummary {}

export const ArticleEntryFields = `${EntityLocalizedFields}
${SummaryFields}`;

export const ArticleEntryFrag = gql`
fragment ArticleEntryFrag on Article {
  ${ArticleEntryFields}
}
`;

export interface IArticle
  extends IArticleEntry,
    IEditorial<IEntityLocalized>,
    IAppStyled {
  image: IImage;
  audio: IAudio;
  category: IEntity;
  appstyle: string;
  routelabel: IRouteLabeled;
}

export function isIArticle(obj: any): obj is IArticle {
  return obj && obj.typeName === "Article";
}

export const ArticleFields = `${EditorialFields}
category { ${EntityFields} }
image { ${ImageFields} }
audio { ${AudioFields} }
appstyle
${RouteLabelFields}
`;

export const ArticleFrag = gql`
fragment ArticleFrag on Article {
  ${ArticleFields} 
}
`;
