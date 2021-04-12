import { gql, serviceGQuery } from "@/modules/graphql";
import { GlossaryTermFields, IGlossaryTerm } from "../types";
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
      glossaryterms(routes: $routes, lang: $lang) {
        ${GlossaryTermFields}
      }
    }
  `;

  return serviceGQuery<{ glossaryterms: IGlossaryTerm[] }>(query, {
    routes: [route],
    lang,
  }).then(data => logAndNull(data)?.glossaryterms?.[0] ?? null);
}
