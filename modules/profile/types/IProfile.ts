import {
  IEntityTranslated,
  EntityTranslatedFields,
  IEntityLocalized,
} from "@/modules/model";
import {
  ILanguageLevel,
  LanguageLevelFields,
  ILanguageLevelInput,
  languageLevelToInput,
  IAddress,
  AddressFields,
  IAddressInput,
  addressToInput,
  IPhone,
  PhoneFields,
  IPhoneInput,
  phoneToInput,
  IEmail,
  EmailFields,
  IEmailInput,
  emailToInput,
} from "./dataTypes";
import {
  OrganisationTypeName,
  PersonalTypeName,
  ProfessionalTypeName,
} from ".";
import { IImage, ImageGQL } from "@/modules/editorial/types";

export interface IProfile extends IEntityTranslated<IEntityLocalized> {
  image: IImage;
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
image { ${ImageGQL} }
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

export function profileToInput(profile: IProfile): IProfileInput {
  const { addresses, phones, emails, languageLevels } = profile;
  return {
    addresses: addresses.map(addressToInput),
    phones: phones.map(phoneToInput),
    emails: emails.map(emailToInput),
    languageLevels: languageLevels.map(languageLevelToInput),
  };
}
