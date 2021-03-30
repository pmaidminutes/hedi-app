import { getClient, gql, GQLEndpoint } from "@/modules/graphql";
import { EntityFields, IEntity } from "@/modules/model";
import { IAuthHeader } from "@/modules/auth/types";

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

  const client = await getClient(GQLEndpoint.User, authHeader);
  const { profile } = await client
    .request<{ profile: IEntity | {} }>(query, { lang })
    .catch(e => {
      console.warn(e);
      return { profile: null };
    });

  if (!profile || Object.keys(profile).length === 0) return null; // {} case is, profile available but not of any of the queried types

  return { ...(profile as IEntity) };
}
