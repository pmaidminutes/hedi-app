import { gql, serviceGQuery } from "@/modules/graphql";
import { GlossaryTermGQL, IGlossaryTerm } from "../types";
import { getLangByRoute } from "@/modules/common/utils";
import { logAndNull } from "@/modules/common/error";

export async function getGlossaryTerm(
  route: string
): Promise<IGlossaryTerm | null> {
  const lang = getLangByRoute(route);

  const query = gql`
    query getGlossaryTerm(
      $routes: [String!]!
      $lang: String
      $includeSelf: Boolean
    ) {
      glossaryTerms(routes: $routes, lang: $lang) {
        ${GlossaryTermGQL}
      }
    }
  `;

  return serviceGQuery<{ glossaryTerms: IGlossaryTerm[] }>(query, {
    routes: [route],
    lang,
  }).then(data => logAndNull(data)?.glossaryTerms?.[0] ?? null);
}
