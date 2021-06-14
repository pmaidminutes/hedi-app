import { gql, serviceGQuery } from "@/modules/graphql";
import { GlossaryGQL, IGlossary, IGlossaryTerm } from "../types";
import { getLangByRoute } from "@/modules/common/utils";
import { logAndFallback } from "@/modules/common/error";
export async function getGlossaryContent(route: string): Promise<IGlossary> {
  const lang = getLangByRoute(route);

  const query = gql`
    query getGlossary(
      $lang: String
      $includeSelf: Boolean
    ) {
      glossaryTerms(lang: $lang) {
        ${GlossaryGQL}
      }
    }
  `;
  const glossary = await serviceGQuery<IGlossary>(query, {
    lang,
  }).then(data =>
    logAndFallback(data, { glossaryTerms: [] as IGlossaryTerm[] } as IGlossary)
  );

  if (!glossary) throw new Error("Error while fetching Profile Page data");
  console.log(glossary);
  return glossary as IGlossary;
}
