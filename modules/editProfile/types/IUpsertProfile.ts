import { gql } from "@/modules/graphql";
import { ErrorMap } from "@/modules/model";
import { UpsertProfileGQL } from "./IEditProfile";

export interface IUpsertProfileResponse {
  success: boolean;
  errors?: ErrorMap;
  profile?: any;
  route?: string;
}

export const UpsertProfileResponseGQL = gql`... on UpsertProfileResponse {
success 
errors
profile { ${UpsertProfileGQL} }
route
}`;
