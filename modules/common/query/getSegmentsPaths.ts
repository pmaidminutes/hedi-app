import { getServiceClient, gql, GQLEndpoint } from "@/modules/graphql";
import { IEntityLocalized } from "@/modules/model";
import { routeToSegments } from "../utils";
import { ISegmentPath } from "../types";

export async function getSegmentsPaths(
  gqlQueries: string[],
  lang: string
): Promise<ISegmentPath[]> {
  const query = gql`
  query getSegmentsPaths($lang: String) {
    ${gqlQueries.join("\n")}
  }`;

  const client = await getServiceClient(GQLEndpoint.Internal);
  if (!client) return [];

  return client
    .request<Record<string, IEntityLocalized[]>>(query, { lang })
    .catch(error => {
      console.error("error", error);
      return [];
    })
    .then(response =>
      Object.values(response).flatMap(ets =>
        (Array.isArray(ets) ? ets : [ets])
          .filter(e => e.lang === lang)
          .map(e => ({
            params: { segments: routeToSegments(e.route) },
            locale: e.lang,
          }))
      )
    );
}
