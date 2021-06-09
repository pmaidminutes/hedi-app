import { IComponent } from "@/modules/components/types";
import { gql } from "@/modules/graphql";
import {
  EntityFields,
  IEntity,
  IEntityLocalized,
  EntityLocalizedFields,
  IAppStyled,
  IRouteLabeled,
  RouteLabelFields,
  EntityTranslatedFields,
  WithTagsFields,
  IEntityTranslated,
} from "@/modules/model";

export interface IArticleEntry extends IEntityLocalized {}

export const ArticleEntryGQL = gql`... on Article {
${EntityLocalizedFields}
}`;

export interface IArticle
  extends IArticleEntry,
    IEntityTranslated<IEntityLocalized>,
    IAppStyled,
    IRouteLabeled {
  category: IEntity;
  appstyle: string;
  components: IComponent[];
}

export function isIArticle(obj: any): obj is IArticle {
  return obj && obj?.type === "Article";
}

export const ArticleGQL = gql`... on Article {
  ${EntityTranslatedFields}
  ${WithTagsFields}
  category { ${EntityFields} }
  appstyle
  ${RouteLabelFields}
  components
}`;
