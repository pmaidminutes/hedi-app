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
import { CarbonIconType } from "@carbon/icons-react";

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
  appStyle: string;
  components: IComponent[];
}

export function isIArticle(obj: any): obj is IArticle {
  return obj && obj?.type === "Article";
}

export const ArticleGQL = gql`... on Article {
  ${EntityTranslatedFields}
  ${WithTagsFields}
  category { ${EntityFields} }
  appStyle
  ${RouteLabelFields}
  components
}`;

export interface IArticleAction {
  icon: CarbonIconType;
  description: string;
  handler: Function;
}
