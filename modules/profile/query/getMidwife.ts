import { getServiceClient, gql } from "@/modules/graphql";
import { IMidwife, MidwifeFields } from "../types";

export async function getMidwife(route: string): Promise<IMidwife | null> {
  console.log({ route });
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
    .request<{ midwife: IMidwife }>(query, { route })
    .then(data => data.midwife)
    .catch(e => {
      console.warn(e);
      return null;
    });
}
