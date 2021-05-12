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
import { AudioGQL, IAudio, IImage, ImageGQL } from "@/modules/editorial/types";
export interface IArticleEntry extends IEntityLocalized, ISummary {}

export const ArticleEntryGQL = gql`... on Article {
${EntityLocalizedFields}
${SummaryFields}
}`;

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

// UNUSED
export function isIArticle(obj: any): obj is IArticle {
  return obj && obj.typeName === "Article";
}

export const ArticleGQL = gql`... on Article {
${EditorialFields}
category { ${EntityFields} }
image { ${ImageGQL} }
audio { ${AudioGQL} }
appstyle
${RouteLabelFields}
}`;
