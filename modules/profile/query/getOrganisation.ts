import { getServiceClient, gql } from "@/modules/graphql";
import { IOrganisation, OrganisationFields } from "../types";
import { getLangByRoute } from "@/modules/common/utils";

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

  const client = await getServiceClient();
  return client
    .request<{ organisations: IOrganisation[] }>(query, {
      routes: [route],
      lang,
    })
    .then(data => data.organisations[0])
    .catch(e => {
      console.warn(e);
      return null;
    });
}
