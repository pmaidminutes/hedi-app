import { IAuthHeader } from "@/modules/auth/types";
import { IHTTPError, IsIHTTPError } from "@/modules/common/error";
import { gql, userGQuery } from "@/modules/graphql";
import {
  EditProfileInput,
  IUpsertProfile,
  UpsertProfileFields,
} from "../types";

export async function upsertProfileQuery(
  input: {
    profile?: EditProfileInput;
    lang: string;
  },
  authHeader: IAuthHeader
): Promise<IUpsertProfile | IHTTPError> {
  const mutation = gql`
    mutation editProfile(
      $profile: UpsertProfileInput 
      $lang: String
      ) {
      upsertProfile(input: $profile, lang: $lang) {
        ${UpsertProfileFields}
      }
    }`;

  return userGQuery<{ upsertProfile: IUpsertProfile }>(
    authHeader,
    mutation,
    input
  ).then(data => {
    if (IsIHTTPError(data)) return data;
    if (
      Array.isArray(data.upsertProfile?.errors) &&
      !data.upsertProfile.errors.length
    ) {
      data.upsertProfile.errors = undefined;
    }
    return data.upsertProfile;
  });
}
