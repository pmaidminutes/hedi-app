import { getServiceClient, gql } from "@/common/graphql";
import { GlossaryFields, IGlossary, IGlossaryEntry } from "./types";

export async function getAllGlossaries(lang: string) {
  const query = gql`
      query getAllGlossaries($langcode: String) {
        glossary(langcode: $langcode) {
            ${GlossaryFields}
        }
      }
    `;

  const client = await getServiceClient();

  let glossaries = client
    .request<{ glossary: IGlossaryEntry[] }>(query, {
      langcode: lang,
    })
    .then(data => data.glossary ?? []);

  return glossaries;
}
