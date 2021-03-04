import { getServiceClient, gql } from "@/modules/graphql";
import { IInstitution, InstitutionFields } from "../types";
import { getLangByRoute } from "@/modules/common/utils";

export async function getInstitution(
  route: string
): Promise<IInstitution | null> {
  const lang = getLangByRoute(route)
  
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

  const client = await getServiceClient();
  return client
    .request<{ institutions: IInstitution[] }>(query, { routes: [route], lang })
    .then(data => data.institutions[0])
    .catch(e => {
      console.warn(e);
      return null;
    });
}
