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
import { ImageFields, IImage } from "@/modules/editorial/types";

export interface ICategoryEntry extends IEntityLocalized {
  image?: IImage;
}

export const CategoryEntryGQL = gql`... on Category {
${EntityLocalizedFields}
image { ${ImageFields} }
}`;

export interface ICategoryRoot extends IEntityTranslated<IEntityLocalized> {
  categories: ICategoryEntry[];
}

export const CategoryRootGQL = gql`... on CategoryRoot {
${EntityTranslatedFields}
categories { ${CategoryEntryGQL} }
}`;

export interface ICategory extends ICategoryEntry, ICategoryRoot, IAppStyled {
  parent: number;
  articles: IArticleEntry[];
  appstyle: string;
  routelabel: IRouteLabeled;
}

// UNUSED
export function isICategory(obj: any): obj is ICategory {
  return obj && obj.typeName === "Category";
}

export const CategoryGQL = gql`... on Category {
${EntityTranslatedFields}
${RouteLabelFields}
image { ${ImageFields} }
parent
appstyle
categories { ${CategoryEntryGQL} }
articles { ${ArticleEntryGQL} }
}`;
