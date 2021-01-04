import { gql } from "@/common/graphql";
import {
  EntityFields,
  IEntity,
  ITranslatable,
  ILocalized,
  LocalizedFields,
  ILocalizedEntity,
  LocalizedEntityFields,
  TranslatableFields,
} from "@/common/model/cms";
import { ArticleEntryFields, IArticleEntry } from "./article";
import { ImageFields, IImage } from "./image";

export interface ICategoryEntry extends ILocalizedEntity {
  image?: IImage;
}

export const CategoryEntryFields = `${LocalizedEntityFields}
image { ${ImageFields} }`;

export const CategoryEntryFrag = gql`
fragment CategoryEntryFrag on Category {
  ${CategoryEntryFields}
}
`;

export interface ICategoryRoot extends ITranslatable<ILocalizedEntity> {
  categories: ICategoryEntry[];
}

export const CategoryRootFields = `${TranslatableFields}
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
