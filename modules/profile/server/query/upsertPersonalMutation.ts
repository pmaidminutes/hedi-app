import { IAuthHeader } from "@/modules/auth/types";
import { IHTTPError, IsIHTTPError } from "@/modules/common/error";
import { gql, userGQuery } from "@/modules/graphql";
import {
  IPersonalInput,
  IUpsertPersonalResponse,
  UpsertPersonalResponseGQL,
} from "../../types";

export async function upsertPersonalMutation(
  input: {
    input?: IPersonalInput;
    lang: string;
  },
  authHeader: IAuthHeader
): Promise<IUpsertPersonalResponse | IHTTPError> {
  const mutation = gql`
    mutation upsertPersonal(
      $input: PersonalInput 
      $lang: String
      $includeSelf: Boolean
      ) {
      upsertPersonal(input: $input, lang: $lang) {
        ${UpsertPersonalResponseGQL}
      }
    }`;

  return userGQuery<{ upsertPersonal: IUpsertPersonalResponse }>(
    authHeader,
    mutation,
    input
  ).then(data => {
    if (IsIHTTPError(data)) return data;
    if (
      Array.isArray(data.upsertPersonal?.errors) &&
      !data.upsertPersonal.errors.length
    ) {
      data.upsertPersonal.errors = undefined;
    }
    return data.upsertPersonal;
  });
}
