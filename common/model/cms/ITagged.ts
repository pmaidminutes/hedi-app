import { gql } from "@/common/graphql";
import { ITranslatable, TranslatableFields } from "./ITranslatable";

// defined to be overwritten later
export interface ITag extends ITranslatable<ITag> {}

export interface ITagged {
  tags: ITag[];
}

export const implementsITagged = (obj: any) => !!(obj && obj.tags);

export function isITagged(obj: any): obj is ITagged {
  return implementsITagged(obj);
}

export const TaggedFields = `
  tags {
    ${TranslatableFields}
  }
`;

export const TaggedFrag = gql`
fragment TaggedFrag on ITagged {
  ${TaggedFields}
}
`;
