import { getServiceClient, gql } from "@/modules/graphql";
import { CaregiverFields, ICaregiver } from "../types";

export async function getCaregiver(
  route: string,
  lang = "de"
): Promise<ICaregiver | null> {
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
