import { IEntityLocalized } from "./IEntityLocalized";
import {
  EntityTranslatedFields,
  IEntityTranslated,
  implementsIEntityTranslated,
} from "./IEntityTranslated";
import { IWithKey, WithKeyFields } from "./IWithKey";
import {
  implementsIWithUITexts,
  IWithUITexts,
  WithUITextsFields,
} from "./IWithUITexts";

export interface IUIText
  extends IEntityTranslated<IEntityLocalized>,
    IWithUITexts,
    IWithKey {}

// UNUSED
export const implementsIUIText = (obj: any) =>
  !!(implementsIEntityTranslated(obj) && implementsIWithUITexts(obj));

// UNUSED
export function isIUIText(obj: any): obj is IUIText {
  return obj && obj.typeName === "UIText";
}

export const UITextFields = `${EntityTranslatedFields}
${WithUITextsFields}
${WithKeyFields}
`;
