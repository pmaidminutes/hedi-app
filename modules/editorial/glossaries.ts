import { getServiceClient, gql } from "@/common/graphql";
import { EntityFields, SlugFields } from "@/common/model/cms";
import { GlossaryFields, IGlossaryEntry } from "@/modules/editorial/types";

export async function getGlossaries(lang: string): Promise <IGlossaryEntry[]>  {
  const query = gql`
      query getAllGlossaries($langcode: String, $excludeSelf: Boolean) {
        glossary(langcode: $langcode) {
            ${GlossaryFields}
           
        }
      }
    `;

  const client = await getServiceClient();

  return client
    .request<{ glossary: IGlossaryEntry[] }>(query, {
      langcode: lang,
      excludeSelf: true,
    })
    .then(data => data.glossary ?? []);
}

export async function getGlossaryPaths(langcode: string): Promise <IGlossaryEntry[]> {
  const query = gql`
      query getAllGlossaries($langcode: String) {
        glossary(langcode: $langcode) {
          ${EntityFields},
          ${SlugFields}
        }
      }
    `;

  const client = await getServiceClient();

  return client
    .request<{ glossary: IGlossaryEntry[] }>(query, {
      langcode: langcode,
    })
    .then(data => data.glossary ?? []);
}
