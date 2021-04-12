import { logAndNull } from "@/modules/common/error";
import { gql, serviceGQuery } from "@/modules/graphql";
import {
  CaregiverWithParentsFields,
  ICaregiverWithParents,
} from "../types/CaregiverWithParentsType";

// UNUSED
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

  return serviceGQuery<{ caregivers: ICaregiverWithParents[] }>(query, {
    routes: [route],
    lang,
  }).then(data => logAndNull(data)?.caregivers?.[0] ?? null);
}
