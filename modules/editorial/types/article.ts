import { gql } from "@/common/graphql";
import { BodyFields, URLPathFields, IBody, IEditorial, IEntity,  IURLPath, EditorialFields, EntityFields } from "@/common/model/cms";
import { ImageFields, IImage } from './image'

export interface IArticleEntry extends IEntity, IURLPath, IBody {}

export const ArticleEntryFields = `
  ${EntityFields}
  ${URLPathFields}
  ${BodyFields}
  image {
    ${ImageFields}
  }
`;

export const ArticleEntryFrag = gql`
fragment ArticleEntryFrag on Article {
  ${ArticleEntryFields}
}
`;

export interface IArticle extends IArticleEntry, IEditorial {
  image: IImage
  category: IEntity
}

export function isIArticle(obj: any) : obj is IArticle {
	return (obj && (obj.typeName === 'Article'));
}

export const ArticleFields = `
  ${EditorialFields}
  urlpath
  category {
    ${EntityFields}
  }
  image {
    ${ImageFields}
  }
`;


export const ArticleFrag = gql`
fragment ArticleFrag on Article {
  ${ArticleFields} 
}
`;