import { gql } from "@/modules/graphql";
import { BusinessProfileFields, IBusinessProfile } from "./IBusinessProfile";
import { IProfessional, ProfessionalGQL } from "./IProfessional";

export interface IAssociation extends IBusinessProfile {
  name: string;

  professionals: IProfessional[];
}

export const AssociationGQL: string = gql`... on Association {
  ${BusinessProfileFields}
  name
  professionals { ${ProfessionalGQL} }
}`;
