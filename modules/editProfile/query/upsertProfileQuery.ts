import { IAuthHeader } from "@/modules/auth/types";
import { IHTTPError } from "@/modules/common/error";
import { getClient, gql, GQLEndpoint } from "@/modules/graphql";
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

  const client = await getClient(GQLEndpoint.User, authHeader);
  const result = await client
    .request<{ upsertProfile: IUpsertProfile }>(mutation, input)
    .then(data => {
      if (
        Array.isArray(data.upsertProfile?.errors) &&
        !data.upsertProfile.errors.length
      ) {
        data.upsertProfile.errors = undefined;
      }
      return data.upsertProfile;
    })
    .catch(e => {
      console.warn(e);
      return { status: 500, message: "Internal Server Error" };
    });
  return result;
}
