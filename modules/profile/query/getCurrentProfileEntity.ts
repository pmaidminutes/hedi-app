import { gql, userGQuery } from "@/modules/graphql";
import { EntityFields, IEntity } from "@/modules/model";
import { IAuthHeader } from "@/modules/auth/types";
import { IsIHTTPError, logAndFallback } from "@/modules/common/error";

export async function getCurrentProfileEntity(
  lang: string,
  authHeader: IAuthHeader
): Promise<IEntity | null> {
  const query = gql`
    query getCurrentProfileEntity(
      $lang: String!
    ) {
      profile: currentProfile (lang: $lang) {
        ...on Caregiver {${EntityFields}}
        ...on Midwife {${EntityFields}}
        ...on Institution {${EntityFields}}
        ...on Organisation {${EntityFields}}
      }
    }
  `;
  // TODO once we implemented all profiles, '... on' is obsolete

  const { profile } = await userGQuery<{ profile: IEntity | {} }>(
    authHeader,
    query,
    { lang }
  ).then(data => logAndFallback(data, { profile: {} }));

  if (!profile || Object.keys(profile).length === 0) return null; // {} case is, profile available but not of any of the queried types

  return { ...(profile as IEntity) };
}
