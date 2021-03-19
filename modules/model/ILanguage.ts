import { IEntityTranslated, EntityTranslatedFields } from "@/modules/model";

export interface ILanguage extends IEntityTranslated<ILanguage> {
  code: string;
  native: string;
  isRTL: boolean;
}

export function isILanguage(obj: any): obj is ILanguage {
  return (
    obj &&
    obj.type === "Language" &&
    obj.code != null &&
    obj.native != null &&
    obj.isRTL != null
  );
}

export const LanguageFields = `${EntityTranslatedFields}
code
native
isRTL
`;
