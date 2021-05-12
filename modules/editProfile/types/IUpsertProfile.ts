import { gql } from "@/modules/graphql";
import { ErrorMap } from "@/modules/model";
import { UpsertProfileGQL, IEditProfile } from "./IEditProfile";

export interface IUpsertProfileResponse {
  success: boolean;
  errors?: ErrorMap;
  profile?: IEditProfile;
  route?: string;
}

export const UpsertProfileResponseGQL = gql`... on UpsertProfileResponse {
success 
errors
profile { ${UpsertProfileGQL} }
route
}`;
