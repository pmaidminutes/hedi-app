import {
  IEntityTranslated,
  EntityTranslatedFields,
  IEntityLocalized,
} from "@/modules/model";
import {
  ILanguageLevel,
  LanguageLevelFields,
  IAddress,
  AddressFields,
  IPhone,
  PhoneFields,
  IEmail,
  EmailFields,
} from "./dataTypes";
import { AssociationTypeName, PersonalTypeName, ProfessionalTypeName } from ".";

export interface IProfile extends IEntityTranslated<IEntityLocalized> {
  //image: Image
  languageLevels: ILanguageLevel[];
  addresses: IAddress[];
  phones: IPhone[];
  emails: IEmail[];
}

export const ProfileTypeNames = [
  PersonalTypeName,
  ProfessionalTypeName,
  AssociationTypeName,
];

export function isIProfile(obj: any): obj is IProfile {
  return obj && !!obj.type && ProfileTypeNames.includes(obj.type);
}

export const ProfileFields = `${EntityTranslatedFields}
languageLevels { ${LanguageLevelFields} }
addresses { ${AddressFields} }
phones { ${PhoneFields} }
emails { ${EmailFields} }
`;
