import { getServiceClient, gql, GQLEndpoint } from "@/modules/graphql";
import { CaregiverFields, ICaregiver } from "../types";
import { getLangByRoute } from "@/modules/common/utils";

export async function getCaregiver(route: string): Promise<ICaregiver | null> {
  const lang = getLangByRoute(route);

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

  const client = await getServiceClient(GQLEndpoint.Internal);
  const { caregivers } = await client
    .request<{ caregivers: ICaregiver[] }>(query, { routes: [route], lang })
    .catch(e => {
      console.warn(e);
      return { caregivers: [] };
    });
  if (!caregivers?.[0]) return null;

  const caregiver = caregivers[0];

  return { ...caregiver };
}
