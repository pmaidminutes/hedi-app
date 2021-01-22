import { getServiceClient, gql } from "@/modules/graphql";
import {
  CaregiverFields,
  ICaregiver,
  IMidwife,
  MidwifeFields,
} from "../types/profileTypes";

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
    .request<{ midwife: IMidwife }>(query, { route })
    .then(data => data.midwife)
    .catch(e => {
      console.warn(e);
      return null;
    });
}
