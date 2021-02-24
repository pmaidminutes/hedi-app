import { getServiceClient, gql } from "@/modules/graphql";
import {
  CaregiverWithParentsFields,
  ICaregiverWithParents,
} from "../types/CaregiverWithParentsType";

export async function getCaregiverWithParents(
  route: string,
  lang = "de"
): Promise<ICaregiverWithParents | null> {
  const query = gql`
    query getCaregiver(
      $routes: [String!]
        $lang: String!
        $includeSelf: Boolean
    ) {
      caregivers(routes: $routes, lang: $lang) {
        ${CaregiverWithParentsFields}
      }
    }
  `;

  const client = await getServiceClient();
  return client
    .request<{ caregivers: ICaregiverWithParents[] }>(query, {
      routes: [route],
      lang,
    })
    .then(data => data.caregivers[0])
    .catch(e => {
      console.warn(e);
      return null;
    });
}
