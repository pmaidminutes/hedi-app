import { getServiceClient, gql } from "@/modules/graphql";
import { CaregiverFields, ICaregiver } from "../types";
import { getLangByRoute } from "@/modules/common/utils";

export async function getCaregiver(
  route: string
): Promise<ICaregiver | null> {
  const lang = getLangByRoute(route)
  
  const query = gql`
    query getCaregiver(
      $routes: [String!]
        $lang: String!
        $includeSelf: Boolean
    ) {
      caregivers(routes: $routes, lang: $lang) {
        ${CaregiverFields}
      }
    }
  `;

  const client = await getServiceClient();
  return client
    .request<{ caregivers: ICaregiver[] }>(query, { routes: [route], lang })
    .then(data => data.caregivers[0])
    .catch(e => {
      console.warn(e);
      return null;
    });
}
