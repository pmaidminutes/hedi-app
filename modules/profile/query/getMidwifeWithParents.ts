import { gql, serviceGQuery } from "@/modules/graphql";
import { IMidwifeWithParents, MidwifeWithParentsFields } from "../types";
import { getLangByRoute } from "@/modules/common/utils";
import { logAndNull } from "@/modules/common/error";

// UNUSED
export async function getMidwifeWithParents(
  route: string
): Promise<IMidwifeWithParents | null> {
  const lang = getLangByRoute(route);

  const query = gql`
      query getMidwife(
        $routes: [String!]
        $lang: String!
        $includeSelf: Boolean
      ) {
        midwives(routes: $routes, lang: $lang) {
          ${MidwifeWithParentsFields}
        }
      }
    `;

  return serviceGQuery<{ midwives: IMidwifeWithParents[] }>(query, {
    routes: [route],
    lang,
  }).then(data => logAndNull(data)?.midwives[0] ?? null);
}
