import { getServiceClient, gql } from "@/modules/graphql";
import { CaregiverFields, ICaregiver } from "../types";

export async function getCaregiver(route: string): Promise<ICaregiver | null> {
  const query = gql`
    query getCaregiver(
      $routes: [String!]!
    ) {
      caregivers(routes: $routes) {
        ${CaregiverFields}
      }
    }
  `;

  const client = await getServiceClient();
  return client
    .request<{ caregivers: ICaregiver[] }>(query, { routes: [route] })
    .then(data => data.caregivers[0])
    .catch(e => {
      console.warn(e);
      return null;
    });
}
