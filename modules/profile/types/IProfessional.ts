import { gql } from "@/modules/graphql";
import { IAssociation, AssociationGQL } from "./IAssociation";
import { BusinessProfileFields, IBusinessProfile } from "./IBusinessProfile";

export interface IProfessional extends IBusinessProfile {
  prefix?: string;
  givenName: string;
  familyName?: string;

  associations: IAssociation[];
}

export const ProfessionalGQL: string = gql`... on Professional {
  ${BusinessProfileFields}
  prefix givenName familyName
  associations { ${AssociationGQL} }
}`;
