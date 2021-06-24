import { IBodyComponent, IComponent } from "@/modules/components/types";
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
import { IImage } from "../../types";

export interface IArticleTeaser extends IArticleEntry {
  image?: IImage;
  summary?: IBodyComponent;
}

export interface IArticleEntry
  extends IEntityLocalized,
    IRouteLabeled,
    IAppStyled {}

export const ArticleEntryGQL = gql`... on Article {
${EntityLocalizedFields}
${RouteLabelFields}
appStyle
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
