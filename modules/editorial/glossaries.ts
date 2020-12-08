import { getServiceClient, gql } from "@/common/graphql";
import { EntityFields, SlugFields } from "@/common/model/cms";
import { reDesignStaticGlossaryPaths } from "@/modules/editorial/generators/glossary";
import { GlossaryFields, IGlossaryEntry } from "@/modules/editorial/types";

export async function getGlossaries(lang: string) {
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

export async function getGlossaryPaths(langcode: string) {
  const query = gql`
      query getAllGlossaries($langcode: String) {
        glossary(langcode: $langcode) {
          ${EntityFields},
          ${SlugFields}
        }
      }
    `;

  const client = await getServiceClient();

  const glossaryEntries = client
    .request<{ glossary: IGlossaryEntry[] }>(query, {
      langcode: langcode,
    })
    .then(data => data.glossary ?? []);
  return reDesignStaticGlossaryPaths(await glossaryEntries, langcode);
}
