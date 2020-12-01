import { getServiceClient, gql } from "@/common/graphql";
import { GlossaryFields, IGlossary } from "./types";

export async function getAllGlossaries(
    lang: string
  ) {
    const query = gql`
      query getAllGlossaries($langcode: String) {
        glossary(langcode: $langcode) {
            ${GlossaryFields}
        }
      }
    `;
  
    const client = await getServiceClient();
  
    return client
      .request<{ glossary: IGlossary }>(query, {
        langcode: lang,
      })
      .then(data => data.glossary ?? []);
  }
  