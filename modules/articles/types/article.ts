import { gql } from "@/common/graphql";
import { BodyFields, PathFields, IBody, IEditorial, IEntity,  IPath, EditorialFields, EntityFields } from "@/common/model/cms";
import { ImageFields, IImage } from './image'

export interface IArticleEntry extends IPath, IBody {}

export const ArticleEntryFields = `
  ${PathFields}
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
  path
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