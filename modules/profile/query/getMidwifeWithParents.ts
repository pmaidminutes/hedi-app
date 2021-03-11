import { getServiceClient, gql } from "@/modules/graphql";
import { IMidwifeWithParents, MidwifeWithParentsFields } from "../types";
import { getLangByRoute } from "@/modules/common/utils";

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

  const client = await getServiceClient();
  return client
    .request<{ midwives: IMidwifeWithParents[] }>(query, {
      routes: [route],
      lang,
    })
    .then(data => data.midwives[0])
    .catch(e => {
      console.warn(e);
      return null;
    });
}
