import { gql, serviceGQuery } from "@/modules/graphql";
import { getLangByRoute } from "@/modules/common/utils";
import { logAndNull } from "@/modules/common/error";
import { IEntity } from "@/modules/model";

export async function getSegmentsContent(
  route: string,
  gqlTypes: string[]
): Promise<IEntity | null> {
  const lang = getLangByRoute(route);

  const query = gql`
    query getSegmentsContent(
      $routes: [String!]!
      $lang: String!
      $includeSelf: Boolean
    ) {
      entitiesTranslated(routes: $routes, lang: $lang) {
        ${gqlTypes.join("\n")}
      }
    }
  `;
  return serviceGQuery<{ entitiesTranslated: IEntity[] }>(query, {
    routes: [route],
    lang,
  }).then(data => logAndNull(data)?.entitiesTranslated[0] ?? null);
}
