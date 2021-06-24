import { gql } from "@/modules/graphql";
import {
  IBusinessProfile,
  BusinessProfileFields,
  IBusinessProfileLink,
  BusinessProfileLinkFields,
  IBusinessProfileInput,
  businessProfileToInput,
} from "./IBusinessProfile";

export interface IProfessional extends IBusinessProfile {
  prefix?: string;
  givenName: string;
  familyName?: string;

  organisations: IBusinessProfileLink[];
}

export const ProfessionalTypeName = "Professional";

export function isIProfessional(obj: any): obj is IProfessional {
  return obj && obj?.type === ProfessionalTypeName;
}

export const ProfessionalGQL: string = gql`... on Professional {
  ${BusinessProfileFields}
  prefix givenName familyName
  organisations { ${BusinessProfileLinkFields} }
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
  const { prefix, givenName, familyName, ...businessProfile } = professional;
  return {
    prefix,
    givenName,
    familyName,
    ...businessProfileToInput(businessProfile),
  };
}
