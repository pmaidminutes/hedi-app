import { gql } from "@/common/graphql";
import { EntityFields } from "./IEntity";
import { isITaxonomy, ITaxonomy } from "./ITaxonomy";

// defined to be overwritten later
export interface ITag extends ITaxonomy { }

export interface ITags {
  tags: ITag[]
};

export function isITags(obj: any) : obj is ITags {
  return (obj && obj.tags && Array.isArray(obj.tags) && (obj.tags.length === 0  || isITaxonomy(obj.tags[0]))) ? true : false;
}

export const TagsFields = `
  tags {
    ${EntityFields}
  }
`;

export const TagsFrag = gql`
fragment TagsFrag on ITags {
  ${TagsFields}
}
`;