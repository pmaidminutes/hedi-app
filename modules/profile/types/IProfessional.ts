import { gql } from "@/modules/graphql";
import {
  addressToInput,
  consultationHourToInput,
  emailToInput,
  languageLevelToInput,
  phoneToInput,
  websiteToInput,
} from "./dataTypes";
import {
  IBusinessProfile,
  BusinessProfileFields,
  IBusinessProfileLink,
  BusinessProfileLinkFields,
  IBusinessProfileInput,
} from "./IBusinessProfile";

export interface IProfessional extends IBusinessProfile {
  prefix?: string;
  givenName: string;
  familyName?: string;

  associations: IBusinessProfileLink[];
}

export const ProfessionalTypeName = "Professional";

export function isIProfessional(obj: any): obj is IProfessional {
  return obj && obj?.type === ProfessionalTypeName;
}

export const ProfessionalGQL: string = gql`... on Professional {
  ${BusinessProfileFields}
  prefix givenName familyName
  associations { ${BusinessProfileLinkFields} }
}`;

export interface IProfessionalInput extends IBusinessProfileInput {
  prefix?: string;
  givenName: string;
  familyName?: string;
}

export const ProfessionalInputDefault: IProfessionalInput = {
  givenName: "",
  profession: 0,
  addresses: [],
  phones: [],
  emails: [],
  websites: [],
  languageLevels: [],
  consultationHours: [],
  services: [],
};

export function professionalToInput(
  professional: IProfessional
): IProfessionalInput {
  const {
    prefix,
    givenName,
    familyName,
    addresses,
    phones,
    emails,
    websites,
    languageLevels,
    consultationHours,
    profession,
    services,
  } = professional;
  return {
    prefix,
    givenName,
    familyName,
    addresses: addresses.map(addressToInput),
    phones: phones.map(phoneToInput),
    emails: emails.map(emailToInput),
    websites: websites.map(websiteToInput),
    languageLevels: languageLevels.map(languageLevelToInput),
    consultationHours: consultationHours.map(consultationHourToInput),
    profession: profession.index,
    services: services.map(s => s.route),
  };
}
