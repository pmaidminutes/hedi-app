import { IAuthHeader } from "@/modules/auth/types";
import { IHTTPError, IsIHTTPError } from "@/modules/common/error";
import { gql, userGQuery } from "@/modules/graphql";
import {
  IProfessionalInput,
  IUpsertProfessionalResponse,
  UpsertProfessionalResponseGQL,
} from "../../types";

export async function upsertProfessionalMutation(
  input: {
    input?: IProfessionalInput;
    lang: string;
  },
  authHeader: IAuthHeader
): Promise<IUpsertProfessionalResponse | IHTTPError> {
  const mutation = gql`
    mutation upsertProfessional(
      $input: IProfessionalInput 
      $lang: String
      ) {
      upsertProfessional(input: $input, lang: $lang) {
        ${UpsertProfessionalResponseGQL}
      }
    }`;

  return userGQuery<{ upsertProfessional: IUpsertProfessionalResponse }>(
    authHeader,
    mutation,
    input
  ).then(data => {
    if (IsIHTTPError(data)) return data;
    if (
      Array.isArray(data.upsertProfessional?.errors) &&
      !data.upsertProfessional.errors.length
    ) {
      data.upsertProfessional.errors = undefined;
    }
    return data.upsertProfessional;
  });
}
