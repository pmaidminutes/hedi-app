import { gql, userGQuery } from "@/modules/graphql";
import { IAuthHeader } from "@/modules/auth/types";
import { logAndFallback } from "@/modules/common/error";
import { IUserProfile, UserProfileGQL } from "../../types";

type CurrentProfileResponse = { profile: IUserProfile | null };

export async function getCurrentProfile(
  lang: string,
  authHeader: IAuthHeader
): Promise<IUserProfile | null> {
  const query = gql`
    query getCurrentProfile(
      $lang: String!
      $includeSelf: Boolean
    ) {
      profile: currentProfile (lang: $lang) {
        ${UserProfileGQL}
      }
    }
  `;

  const { profile } = await userGQuery<CurrentProfileResponse>(
    authHeader,
    query,
    { lang }
  ).then(data =>
    logAndFallback(data, { profile: null } as CurrentProfileResponse)
  );

  return profile;
}
