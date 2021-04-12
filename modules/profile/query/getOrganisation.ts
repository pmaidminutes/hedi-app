import { gql, serviceGQuery } from "@/modules/graphql";
import { IOrganisation, OrganisationFields } from "../types";
import { getLangByRoute } from "@/modules/common/utils";
import { logAndNull } from "@/modules/common/error";

export async function getOrganisation(
  route: string
): Promise<IOrganisation | null> {
  const lang = getLangByRoute(route);

  const query = gql`
    query getOrganisation(
      $routes: [String!]
        $lang: String!
        $includeSelf: Boolean
    ) {
      organisations(routes: $routes, lang: $lang) {
        ${OrganisationFields}
      }
    }
  `;

  return serviceGQuery<{ organisations: IOrganisation[] }>(query, {
    routes: [route],
    lang,
  }).then(data => logAndNull(data)?.organisations[0] ?? null);
}
