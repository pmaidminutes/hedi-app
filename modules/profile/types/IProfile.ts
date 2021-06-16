import {
  IEntityTranslated,
  EntityTranslatedFields,
  IEntityLocalized,
} from "@/modules/model";
import {
  ILanguageLevel,
  LanguageLevelFields,
  ILanguageLevelInput,
  IAddress,
  AddressFields,
  IAddressInput,
  IPhone,
  PhoneFields,
  IPhoneInput,
  IEmail,
  EmailFields,
  IEmailInput,
} from "./dataTypes";
import {
  OrganisationTypeName,
  PersonalTypeName,
  ProfessionalTypeName,
} from ".";

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
    OrganisationTypeName,
  ];
  return obj && !!obj.type && profileTypeNames.includes(obj.type);
}

export const ProfileFields = `${EntityTranslatedFields}
languageLevels { ${LanguageLevelFields} }
addresses { ${AddressFields} }
phones { ${PhoneFields} }
emails { ${EmailFields} }
`;

export interface IProfileInput {
  //image: Image
  languageLevels: ILanguageLevelInput[];
  addresses: IAddressInput[];
  phones: IPhoneInput[];
  emails: IEmailInput[];
}
