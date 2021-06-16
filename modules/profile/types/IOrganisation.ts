import { gql } from "@/modules/graphql";
import {
  IBusinessProfile,
  BusinessProfileFields,
  IBusinessProfileLink,
  BusinessProfileLinkFields,
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
