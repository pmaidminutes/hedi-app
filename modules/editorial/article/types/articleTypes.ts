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
import { IPage } from "@/modules/page/types";
import { ICategoryEntry } from "../../category/types";
import { CategoryEntryGQL } from "../../category/types/categoryEntry";
import { IImage } from "../../types";

export interface IArticleEntry
  extends IEntityLocalized,
    IRouteLabeled,
    IAppStyled {
  image?: IImage;
  summary?: string;
}

export const ArticleEntryGQL = gql`... on Article {
${EntityLocalizedFields}
${RouteLabelFields}
appStyle
summary
}`;

export interface IArticleView extends IArticle {
  uiComponents: IComponent[];
}

export interface IArticle
  extends IArticleEntry,
    IEntityTranslated<IEntityLocalized>,
    IAppStyled,
    IRouteLabeled {
  category: ICategoryEntry;
  appStyle: string;
  components: IComponent[];
  summary?: string;
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
  summary
}`;
