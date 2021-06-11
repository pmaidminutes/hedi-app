import { gql, serviceGQuery } from "@/modules/graphql";
import { GlossaryGQL, IGlossary, IGlossaryTerm } from "../types";
import { getLangByRoute } from "@/modules/common/utils";
import { logAndFallback } from "@/modules/common/error";
export async function getGlossaryDefinition(route: string): Promise<IGlossary> {
  const lang = getLangByRoute(route);

  const query = gql`
    query getGlossary(
      $route: String
      $lang: String
      $includeSelf: Boolean
    ) {
      glossaryterms(route: $route, lang: $lang) {
        ${GlossaryGQL}
      }
    }
  `;

  const glossaries = await serviceGQuery<{ terms: IGlossaryTerm[] }>(query, {
    route,
    lang,
  }).then(data => logAndFallback(data, { terms: [] as IGlossaryTerm[] }));

  if (!glossaries) throw new Error("Error while fetching Profile Page data");
  return glossaries as IGlossary;
}
