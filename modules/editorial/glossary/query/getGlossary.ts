import { getServiceClient, gql } from "@/common/graphql";
import { GlossaryFields, IGlossary, IGlossaryGrouped } from "../types";
import { glossaryToGroupedGlossary } from "./functions";

export async function getGlossary(
  route: string,
  lang = "de"
): Promise<IGlossaryGrouped | null> {
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
    .then(data => glossaryToGroupedGlossary(data.glossary))
    .catch(e => {
      console.warn(e);
      return null;
    });
}
