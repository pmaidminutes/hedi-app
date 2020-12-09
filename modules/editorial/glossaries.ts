import { getServiceClient, gql } from "@/common/graphql";
import { EntityFields, SlugFields } from "@/common/model/cms";
import { GlossaryFields, IGlossaryEntry } from "@/modules/editorial/types";
import { IGlossaryPaths } from "./generators/glossary";

export async function getGlossaries(lang: string): Promise<IGlossaryEntry[]> {
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

export async function getGlossaryPaths(
  langcode: string
): Promise<IGlossaryPaths[]> {
  const query = gql`
      query getAllGlossaries($langcode: String) {
        glossary(langcode: $langcode) {
          ${EntityFields},
          ${SlugFields}
        }
      }
    `;

  const client = await getServiceClient();

  const glossaryEntries: IGlossaryEntry[] = await client
    .request<{ glossary: IGlossaryEntry[] }>(query, {
      langcode: langcode,
    })
    .then(data => data.glossary ?? []);

  return reDesignStaticGlossaryPaths(glossaryEntries, langcode);
}

function reDesignStaticGlossaryPaths(
  glossaryEntries: IGlossaryEntry[],
  locale: string
): IGlossaryPaths[] {
  const glossaryPaths: IGlossaryPaths[] = [];
  glossaryEntries.forEach(x => {
    glossaryPaths.push(composeGlossaryUrls(x.slug, locale));
  });
  return glossaryPaths;
}

function composeGlossaryUrls(slug: string, locale: string) {
  const slugArray = slug.split("/");
  return {
    params: { glossaryLocalized: slugArray[1] },
    locale: locale,
  };
}
