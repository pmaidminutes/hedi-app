import { getServiceClient, gql } from "@/modules/graphql";
import { GlossaryTermFields, IGlossaryTerm } from "../types";
import {getLangByRoute} from '@/modules/common/utils'

export async function getGlossaryTerm(
  route: string
): Promise<IGlossaryTerm | null> {
  const lang = getLangByRoute(route)
  
  const query = gql`
    query getGlossaryTerm(
      $routes: [String!]!
      $lang: String
      $includeSelf: Boolean
    ) {
      glossaryterms(routes: $routes, lang: $lang) {
        ${GlossaryTermFields}
      }
    }
  `;

  const client = await getServiceClient();
  return client
    .request<{ glossaryterms: IGlossaryTerm[] }>(query, {
      routes: [route],
      lang,
    })
    .then(data => data.glossaryterms?.[0])
    .catch(e => {
      console.warn(e);
      return null;
    });
}
