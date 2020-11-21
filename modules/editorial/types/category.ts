import { gql } from "@/common/graphql";
import { EntityFields, IEntity, IURLPath, ITaxonomy, ITranslations, URLPathFields, TaxonomyFields, ITranslatable, TranslatableFields } from "@/common/model/cms";
import { ArticleEntryFields, IArticleEntry } from "./article";
import { ImageFields, IImage } from "./image"

export interface ICategoryEntry extends IEntity, IURLPath, ITranslatable {
  image?: IImage
}

export const CategoryEntryFields = `
  ${EntityFields}
  ${URLPathFields}
  ${TranslatableFields}
  image {
    ${ImageFields}
  }
`;

export const CategoryEntryFrag = gql`
fragment CategoryEntryFrag on Category {
  ${CategoryEntryFields}
}
`;

export interface ICategory extends ICategoryEntry, ITaxonomy, ITranslations<ICategoryEntry> {
  parent: number
  categories: ICategoryEntry[]
  articles: IArticleEntry[]
  translations: ICategoryEntry[]
}

export function isICategory(obj: any) : obj is ICategory {
	return (obj && obj.typeName === 'Category')
}

export const CategoryFields = `
  ${TaxonomyFields}
  urlpath
  ${TranslatableFields}
  image {
    ${ImageFields}
  }
  categories {
    ${CategoryEntryFields}
  }
  articles {
    ${ArticleEntryFields}
  }
  translations(excludeSelf: $excludeSelf) {
    ${CategoryEntryFields}
  }
`;


export const CategoryFrag = gql`
fragment CategoryFrag on Category {
  ${CategoryFields}
}
`;

export interface ICategoryExpanded extends ICategory {
  categories: ICategory[]
}

export const CategoryExpandedFrag = gql`
fragment CategoryExpandedFrag on Category {
  ...CategoryFrag
  categories {
    ...CategoryFrag
  }
}
${CategoryFrag}
`;