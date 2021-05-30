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

export interface IProfile extends IEntityTranslated<IEntityLocalized> {
  //image: Image
  languageLevels: ILanguageLevel[];
  addresses: IAddress[];
  phones: IPhone[];
  emails: IEmail[];
}

export const ProfileFields = `${EntityTranslatedFields}
languageLevels { ${LanguageLevelFields} }
addresses { ${AddressFields} }
phones { ${PhoneFields} }
emails { ${EmailFields} }
`;
