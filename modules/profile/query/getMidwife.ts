import { getLangByRoute } from "@/modules/common/utils";
import { getServiceClient, gql } from "@/modules/graphql";
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

  const client = await getServiceClient();
  return client
    .request<{ midwives: IMidwife[] }>(query, { routes: [route], lang })
    .then(data => data.midwives[0])
    .catch(e => {
      console.warn(e);
      return null;
    });
}
