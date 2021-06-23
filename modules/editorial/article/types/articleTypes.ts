import { IComponent } from "@/modules/components/types";
import { gql } from "@/modules/graphql";
import {
  IEntityLocalized,
  EntityLocalizedFields,
  IAppStyled,
  IRouteLabeled,
  RouteLabelFields,
  EntityTranslatedFields,
  WithTagsFields,
  IEntityTranslated,
} from "@/modules/model";
import { ICategoryEntry } from "../../category/types";
import { CategoryEntryGQL } from "../../category/types/categoryEntry";

export interface IArticleEntry extends IEntityLocalized {}

export const ArticleEntryGQL = gql`... on Article {
${EntityLocalizedFields}
}`;

export interface IArticle
  extends IArticleEntry,
    IEntityTranslated<IEntityLocalized>,
    IAppStyled,
    IRouteLabeled {
  category: ICategoryEntry;
  appStyle: string;
  components: IComponent[];
}

export function isIArticle(obj: any): obj is IArticle {
  return obj && obj?.type === "Article";
}

export const ArticleGQL = gql`... on Article {
  ${EntityTranslatedFields}
  ${WithTagsFields}
  category{
    ${CategoryEntryGQL}
}
  appStyle
  ${RouteLabelFields}
  components
}`;

export type ActionBarType =
  | "audio"
  | "bookmark"
  | "share"
  | "print"
  | "language"
  | "copylink";
export interface IArticleAction {
  type: ActionBarType;
  description: string;
  handler: Function;
}
