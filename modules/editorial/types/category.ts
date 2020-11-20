import { gql } from "@/common/graphql";
import { EntityFields, IEntity, IURLPath, ITaxonomy, URLPathFields, TaxonomyFields, ITranslatable, TranslatableFields } from "@/common/model/cms";
import { ArticleEntryFields, IArticleEntry } from "./article";
import { ImageFields, IImage } from "./image"

export interface ICategoryEntry extends IEntity, IURLPath {
  image?: IImage
}

export const CategoryEntryFields = `
  ${EntityFields}
  ${URLPathFields}
  image {
    ${ImageFields}
  }
`;

export const CategoryEntryFrag = gql`
fragment CategoryEntryFrag on Category {
  ${CategoryEntryFields}
}
`;

export interface ICategory extends ICategoryEntry, ITaxonomy, ITranslatable<ICategory> {
  parent: number
  categories: ICategoryEntry[]
  articles: IArticleEntry[]
  translations: ICategory[]
}

export function isICategory(obj: any) : obj is ICategory {
	return (obj && obj.typeName === 'Category')
}

// TODO this is very eager fetching, think of easier field selection while staying typed
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
  translations {
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