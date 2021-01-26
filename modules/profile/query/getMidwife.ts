import { getServiceClient, gql } from "@/modules/graphql";
import { IMidwife, MidwifeFields } from "../types";

export async function getMidwife(route: string): Promise<IMidwife | null> {
  const query = gql`
      query getMidwife(
        $route: [String!]
      ) {
        midwives(routes: $route) {
          ${MidwifeFields}
        }
      }
    `;

  const client = await getServiceClient();
  return client
    .request<{ midwives: IMidwife[] }>(query, { routes: [route] })
    .then(data => data.midwives[0])
    .catch(e => {
      console.warn(e);
      return null;
    });
}
