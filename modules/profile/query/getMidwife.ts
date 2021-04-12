import { logAndNull } from "@/modules/common/error";
import { getLangByRoute } from "@/modules/common/utils";
import { gql, serviceGQuery } from "@/modules/graphql";
import { IMidwife, MidwifeFields } from "../types";

export async function getMidwife(route: string): Promise<IMidwife | null> {
  const lang = getLangByRoute(route);

  const query = gql`
      query getMidwife(
        $routes: [String!]
        $lang: String!
        $includeSelf: Boolean
      ) {
        midwives(routes: $routes, lang: $lang) {
          ${MidwifeFields}
        }
      }
    `;

  return serviceGQuery<{ midwives: IMidwife[] }>(query, {
    routes: [route],
    lang,
  }).then(data => logAndNull(data)?.midwives[0] ?? null);
}
