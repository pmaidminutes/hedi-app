import { gql, userGQuery } from "@/modules/graphql";
import { IAuthHeader } from "@/modules/auth/types";
import { logAndFallback } from "@/modules/common/error";

type CurrentProfileRouteResponse = { currentProfile: { route: string } | null };

export async function getCurrentProfileRoute(
  lang: string,
  authHeader: IAuthHeader
): Promise<string | null> {
  const query = gql`
    query getCurrentProfileRoute($lang: String!) {
      currentProfile(lang: $lang) {
        route
      }
    }
  `;

  const { currentProfile } = await userGQuery<CurrentProfileRouteResponse>(
    authHeader,
    query,
    { lang }
  ).then(data =>
    logAndFallback(data, {
      currentProfile: null,
    } as CurrentProfileRouteResponse)
  );

  return currentProfile?.route ?? null;
}
