import { gql, userGQuery } from "@/modules/graphql";
import { IAuthHeader } from "@/modules/auth/types";
import { logAndFallback } from "@/modules/common/error";

export async function getCurrentProfile(
  lang: string,
  authHeader: IAuthHeader
): Promise<any | null> {
  const query = gql`
    query getCurrentProfile(
      $lang: String!
      $includeSelf: Boolean
    ) {
      profile: currentProfile (lang: $lang) {
        #CaregiverGQL
        #MidwifeGQL
      }
    }
  `;

  const { profile } = await userGQuery<{ profile: any | {} }>(
    authHeader,
    query,
    { lang }
  ).then(data => logAndFallback(data, { profile: {} }));

  if (!profile || Object.keys(profile).length === 0) return null; // {} case is, profile available but not of any of the queried types

  return profile as any;
}
