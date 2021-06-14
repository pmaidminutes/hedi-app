import { gql } from "@/modules/graphql";
import { IMutationResponse, MutationResponseFields } from "@/modules/model";
import { IProfessional, ProfessionalGQL } from "./IProfessional";

export interface IUpsertProfessionalResponse extends IMutationResponse {
  profile?: IProfessional;
  route?: string;
}

export const UpsertProfessionalResponseGQL = gql`... on UpsertProfessionalResponse {
${MutationResponseFields}
profile { ${ProfessionalGQL} }
route
}`;
