import { gql } from "@/modules/graphql";
import { IMutationResponse, MutationResponseFields } from "@/modules/model";
import { IOrganisation, OrganisationGQL } from "./IOrganisation";
import { IPersonal, PersonalGQL } from "./IPersonal";
import { IProfessional, ProfessionalGQL } from "./IProfessional";

interface IUpsertProfileResponse<T> extends IMutationResponse {
  profile?: T;
  route?: string;
}

export type IUpsertPersonalResponse = IUpsertProfileResponse<IPersonal>;

export const UpsertPersonalResponseGQL = gql`... on UpsertPersonalResponse {
${MutationResponseFields}
profile { ${PersonalGQL} }
route
}`;

export type IUpsertProfessionalResponse = IUpsertProfileResponse<IProfessional>;

export const UpsertProfessionalResponseGQL = gql`... on UpsertProfessionalResponse {
${MutationResponseFields}
profile { ${ProfessionalGQL} }
route
}`;

export type IUpsertOrganisationResponse = IUpsertProfileResponse<IOrganisation>;

export const UpsertOrganisationResponseGQL = gql`... on UpsertOrganisationResponse {
${MutationResponseFields}
profile { ${OrganisationGQL} }
route
}`;
