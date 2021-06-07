import { gql } from "@/modules/graphql";
import {
  IBusinessProfile,
  BusinessProfileFields,
  IBusinessProfileLink,
  BusinessProfileLinkFields,
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
