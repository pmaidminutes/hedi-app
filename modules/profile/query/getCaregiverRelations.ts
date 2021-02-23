import { getServiceClient, gql } from "@/modules/graphql";
import { CaregiverRelationsFields, ICaregiver } from "../types";

export async function getCaregiverRelations(
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
        ${CaregiverRelationsFields}
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
