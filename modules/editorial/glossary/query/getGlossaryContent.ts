import { gql, serviceGQuery } from "@/modules/graphql";
import { GlossaryGQL, IGlossary, IGlossaryTerm } from "../types";
import { logAndFallback } from "@/modules/common/error";
export async function getGlossaryContent(lang: string): Promise<IGlossary> {
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
  return glossary as IGlossary;
}
