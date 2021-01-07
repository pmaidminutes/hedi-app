import { getServiceClient, gql } from "@/common/graphql";
import { GlossaryTermFields, IGlossaryTerm } from "../types";

export async function getGlossaryTerm(
  route: string,
  lang = "de"
): Promise<IGlossaryTerm | null> {
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
