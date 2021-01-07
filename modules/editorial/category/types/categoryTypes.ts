import { gql } from "@/common/graphql";
import {
  IEntityTranslated,
  IEntityLocalized,
  EntityLocalizedFields,
  EntityTranslatedFields,
} from "@/common/model/cms";
import {
  ArticleEntryFields,
  IArticleEntry,
} from "@/modules/editorial/article/types";
import { ImageFields, IImage } from "@/modules/editorial/types";

export interface ICategoryEntry extends IEntityLocalized {
  image?: IImage;
}

export const CategoryEntryFields = `${EntityLocalizedFields}
image { ${ImageFields} }`;

export const CategoryEntryFrag = gql`
fragment CategoryEntryFrag on Category {
  ${CategoryEntryFields}
}
`;

export interface ICategoryRoot extends IEntityTranslated<IEntityLocalized> {
  categories: ICategoryEntry[];
}

export const CategoryRootFields = `${EntityTranslatedFields}
categories { ${CategoryEntryFields} }`;

export interface ICategory extends ICategoryEntry, ICategoryRoot {
  parent: number;
  articles: IArticleEntry[];
}

export function isICategory(obj: any): obj is ICategory {
  return obj && obj.typeName === "Category";
}

export const CategoryFields = `
  ${CategoryRootFields}
  parent
  articles { ${ArticleEntryFields} }
  image { ${ImageFields} }
`;

export const CategoryFrag = gql`
fragment CategoryFrag on Category {
  ${CategoryFields}
}
`;
