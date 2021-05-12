import { gql, serviceGQuery } from "@/modules/graphql";
import { GlossaryGQL, IGlossary, IGlossaryGrouped } from "../types";
import { glossaryToGroupedGlossary } from "./functions";
import { getLangByRoute } from "@/modules/common/utils";
import { logAndNull } from "@/modules/common/error";
export async function getGlossary(
  route: string
): Promise<IGlossaryGrouped | null> {
  const lang = getLangByRoute(route);

  const query = gql`
    query getGlossary(
      $route: String
      $lang: String
      $includeSelf: Boolean
    ) {
      glossary(route: $route, lang: $lang) {
        ${GlossaryGQL}
      }
    }
  `;

  return serviceGQuery<{ glossary: IGlossary }>(query, { route, lang }).then(
    data => {
      const glossary = logAndNull(data)?.glossary;
      return glossary ? glossaryToGroupedGlossary(glossary) : null;
    }
  );
}
