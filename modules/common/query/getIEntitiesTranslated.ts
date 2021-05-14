import { gql, serviceGQuery } from "@/modules/graphql";
import { getLangByRoute } from "@/modules/common/utils";
import { logAndFallback } from "@/modules/common/error";

export async function getIEntitiesTranslated<T>(
  gqlTypes: string[],
  routes: string[],
  lang?: string
): Promise<T[]> {
  lang = lang ?? getLangByRoute(routes?.[0]);

  const query = gql`
    query getEntitiesTranslated(
      $routes: [String!]!
      $lang: String!
      $includeSelf: Boolean
    ) {
      entitiesTranslated(routes: $routes, lang: $lang) {
        ${gqlTypes.join("\n")}
      }
    }
  `;
  return serviceGQuery<{ entitiesTranslated: T[] }>(query, {
    routes,
    lang,
  }).then(
    data =>
      logAndFallback(data, { entitiesTranslated: Array<T>() })
        ?.entitiesTranslated
  );
}
