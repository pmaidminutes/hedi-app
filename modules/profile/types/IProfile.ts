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

export function isIProfile(obj: any): obj is IProfile {
  const profileTypeNames = [
    PersonalTypeName,
    ProfessionalTypeName,
    AssociationTypeName,
  ];
  return obj && !!obj.type && profileTypeNames.includes(obj.type);
}

export const ProfileFields = `${EntityTranslatedFields}
languageLevels { ${LanguageLevelFields} }
addresses { ${AddressFields} }
phones { ${PhoneFields} }
emails { ${EmailFields} }
`;
