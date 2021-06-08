import { gql } from "@/modules/graphql";
import {
  IBusinessProfile,
  BusinessProfileFields,
  IBusinessProfileLink,
  BusinessProfileLinkFields,
} from "./IBusinessProfile";

export interface IAssociation extends IBusinessProfile {
  name: string;

  professionals: IBusinessProfileLink[];
}

export const AssociationTypeName = "Association";

export function isIAssociation(obj: any): obj is IAssociation {
  return obj && obj?.type === AssociationTypeName;
}

export const AssociationGQL: string = gql`... on Association {
  ${BusinessProfileFields}
  name
  professionals { ${BusinessProfileLinkFields} }
}`;
