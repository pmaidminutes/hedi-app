import { gql } from "@/common/graphql";
import { EntityFields, IEntity, IURLPath, ITaxonomy, URLPathFields, TaxonomyFields } from "@/common/model/cms";
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

export interface ICategory extends ICategoryEntry, ITaxonomy {
  parent: number
  categories: ICategoryEntry[]
  articles: IArticleEntry[]
}

export function isICategory(obj: any) : obj is ICategory {
	return (obj && obj.typeName === 'Category')
}

export const CategoryFields = `
  ${TaxonomyFields}
  urlpath
  image {
    ${ImageFields}
  }
  categories {
    ${CategoryEntryFields}
  }
  articles {
    ${ArticleEntryFields}
  }
`;


export const FCategory = gql`
fragment FCategory on Category {
  ${CategoryFields}
}
`;

export interface ICategoryExpanded extends ICategory {
  categories: ICategory[]
}

export const FCategoryExpanded = gql`
fragment FCategoryExpanded on Category {
  ...FCategory
  categories {
    ...FCategory
  }
}
${FCategory}
`;