import { getServiceClient, gql } from "@/common/graphql";
import { GlossaryFields, IGlossaryEntry, IGlossaryItem } from "./types";

export async function getAllGlossaries(lang: string) {
  const query = gql`
      query getAllGlossaries($langcode: String, $excludeSelf: Boolean) {
        glossary(langcode: $langcode) {
            ${GlossaryFields}
           
        }
      }
    `;

  const client = await getServiceClient();

  let glossaries = client
    .request<{ glossary: IGlossaryItem[] }>(query, {
      langcode: lang,
      excludeSelf: true,
    })
    .then(data => data.glossary ?? []);
  return glossaries;
}
