import { getServiceClient, gql } from "@/modules/graphql";
import { IMidwifeWithParents, MidwifeWithParentsFields } from "../types";

export async function getMidwifeWithParents(
  route: string,
  lang = "de"
): Promise<IMidwifeWithParents | null> {
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
