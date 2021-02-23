import { getServiceClient, gql } from "@/modules/graphql";
import { IMidwife, MidwifeRelationsFields } from "../types";

export async function getMidwifeRelations(
  route: string,
  lang = "de"
): Promise<IMidwife | null> {
  const query = gql`
      query getMidwife(
        $routes: [String!]
        $lang: String!
        $includeSelf: Boolean
      ) {
        midwives(routes: $routes, lang: $lang) {
          ${MidwifeRelationsFields}
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
