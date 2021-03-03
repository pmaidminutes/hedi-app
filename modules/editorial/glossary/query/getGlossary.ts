import { getServiceClient, gql } from "@/modules/graphql";
import { GlossaryFields, IGlossary, IGlossaryGrouped } from "../types";
import { glossaryToGroupedGlossary } from "./functions";
import { getLangByRoute } from "@/modules/common/utils";
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
        ${GlossaryFields}
      }
    }
  `;

  const client = await getServiceClient();
  return client
    .request<{ glossary: IGlossary }>(query, { route, lang })
    .then(data =>
      data.glossary ? glossaryToGroupedGlossary(data.glossary) : null
    )
    .catch(e => {
      console.warn(e);
      return null;
    });
}
