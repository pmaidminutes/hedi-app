import { gql } from "@/modules/graphql";
import {
  IBusinessProfile,
  BusinessProfileFields,
  IBusinessProfileLink,
  BusinessProfileLinkFields,
  IBusinessProfileInput,
  businessProfileToInput,
} from "./IBusinessProfile";

export interface IOrganisation extends IBusinessProfile {
  name: string;

  professionals: IBusinessProfileLink[];
}

export const OrganisationTypeName = "Organisation";

export function isIOrganisation(obj: any): obj is IOrganisation {
  return obj && obj?.type === OrganisationTypeName;
}

export const OrganisationGQL: string = gql`... on Organisation {
  ${BusinessProfileFields}
  name
  professionals { ${BusinessProfileLinkFields} }
}`;

export interface IOrganisationInput extends IBusinessProfileInput {
  name: string;
  professionals?: string[];
}

export const OrganisationInputDefault: IOrganisationInput = {
  name: "",
  profession: 0,
  addresses: [],
  phones: [],
  emails: [],
  websites: [],
  languageLevels: [],
  consultationHours: [],
  services: [],
};

export function organisationToInput(
  organisation: IOrganisation
): IOrganisationInput {
  const { name, professionals, ...businessProfile } = organisation;
  const businessProfileInput = businessProfileToInput(businessProfile);
  if (professionals) {
    return {
      name,
      professionals: professionals.map(p => p.route),
      ...businessProfileInput,
    };
  } else {
    return {
      name,
      ...businessProfileInput,
    };
  }
}
