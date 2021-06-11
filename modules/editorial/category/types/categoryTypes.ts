import { gql } from "@/modules/graphql";
import {
  IEntityTranslated,
  IEntityLocalized,
  EntityLocalizedFields,
  EntityTranslatedFields,
  IAppStyled,
  IRouteLabeled,
  RouteLabelFields,
} from "@/modules/model";
import {
  ArticleEntryGQL,
  IArticleEntry,
} from "@/modules/editorial/article/types";
import { ImageGQL, IImage } from "@/modules/editorial/types";

export interface ICategoryEntry extends IEntityLocalized {
  image?: IImage;
}

export const CategoryEntryGQL = gql`... on Category {
${EntityLocalizedFields}
image { ${ImageGQL} }
}`;

export interface ICategoryRoot extends IEntityTranslated<IEntityLocalized> {
  categories: ICategoryEntry[];
}

export const CategoryRootGQL = gql`... on CategoryRoot {
${EntityTranslatedFields}
categories { ${CategoryEntryGQL} }
}`;

export interface ICategory extends ICategoryEntry, ICategoryRoot, IAppStyled, IRouteLabeled {
  parent: number;
  articles: IArticleEntry[];
  appstyle: string;

}

export function isICategory(obj: any): obj is ICategory {
  return obj && obj.type === "Category";
}

export const CategoryGQL = gql`... on Category {
${EntityTranslatedFields}
${RouteLabelFields}
image { ${ImageGQL} }
parent
appstyle
categories { ${CategoryEntryGQL} }
articles { ${ArticleEntryGQL} }
}`;
