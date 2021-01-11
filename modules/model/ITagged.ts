import { IEntityTranslated, EntityTranslatedFields } from "./IEntityTranslated";

// defined to be overwritten later
export interface ITag extends IEntityTranslated<ITag> {}

export interface ITagged {
  tags: ITag[];
}

export const implementsITagged = (obj: any) => !!(obj && obj.tags);

export function isITagged(obj: any): obj is ITagged {
  return implementsITagged(obj);
}

export const TaggedFields = `
  tags {
    ${EntityTranslatedFields}
  }
`;
