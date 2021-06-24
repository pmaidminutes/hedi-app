import { IAuthHeader } from "@/modules/auth/types";
import { IHTTPError, IsIHTTPError } from "@/modules/common/error";
import { gql, userGQuery } from "@/modules/graphql";
import {
  IOrganisationInput,
  IUpsertOrganisationResponse,
  UpsertOrganisationResponseGQL,
} from "../../types";

export async function upsertOrganisationMutation(
  input: {
    input?: IOrganisationInput;
    route?: string;
    lang: string;
  },
  authHeader: IAuthHeader
): Promise<IUpsertOrganisationResponse | IHTTPError> {
  const mutation = gql`
    mutation upsertOrganisation(
      $input: OrganisationInput 
      $route: String
      $lang: String
      $includeSelf: Boolean
      ) {
      upsertOrganisation(input: $input, route: $route, lang: $lang) {
        ${UpsertOrganisationResponseGQL}
      }
    }`;

  return userGQuery<{ upsertOrganisation: IUpsertOrganisationResponse }>(
    authHeader,
    mutation,
    input
  ).then(data => {
    if (IsIHTTPError(data)) return data;
    if (
      Array.isArray(data.upsertOrganisation?.errors) &&
      !data.upsertOrganisation.errors.length
    ) {
      data.upsertOrganisation.errors = undefined;
    }
    return data.upsertOrganisation;
  });
}
