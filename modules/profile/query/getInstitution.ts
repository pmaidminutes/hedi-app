import { gql, serviceGQuery } from "@/modules/graphql";
import { IInstitution, InstitutionFields } from "../types";
import { getLangByRoute } from "@/modules/common/utils";
import { logAndNull } from "@/modules/common/error";

export async function getInstitution(
  route: string
): Promise<IInstitution | null> {
  const lang = getLangByRoute(route);

  const query = gql`
    query getInstitution(
      $routes: [String!]
        $lang: String!
        $includeSelf: Boolean
    ) {
      institutions(routes: $routes, lang: $lang) {
        ${InstitutionFields}
      }
    }
  `;

  return serviceGQuery<{ institutions: IInstitution[] }>(query, {
    routes: [route],
    lang,
  }).then(data => logAndNull(data)?.institutions[0] ?? null);
}
