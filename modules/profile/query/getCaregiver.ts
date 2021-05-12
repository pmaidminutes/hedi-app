import { gql, serviceGQuery } from "@/modules/graphql";
import { CaregiverGQL, ICaregiver } from "../types";
import { getLangByRoute } from "@/modules/common/utils";
import { logAndFallback, logAndNull } from "@/modules/common/error";

export async function getCaregiver(route: string): Promise<ICaregiver | null> {
  const lang = getLangByRoute(route);

  const query = gql`
    query getCaregiver(
      $routes: [String!]
        $lang: String!
        $includeSelf: Boolean
    ) {
      caregivers(routes: $routes, lang: $lang) {
        ${CaregiverGQL}
      }
    }
  `;

  return serviceGQuery<{ caregivers: ICaregiver[] }>(query, {
    routes: [route],
    lang,
  }).then<ICaregiver | null>(data => logAndNull(data)?.caregivers[0] ?? null);
}
