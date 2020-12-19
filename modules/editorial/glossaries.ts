import { getServiceClient, gql } from "@/common/graphql";
import { ISegmentPath } from "@/common/types";
import {
  GlossaryFields,
  IGlossary,
  IGlossaryEntry,
} from "@/modules/editorial/types";

// TODO cms gql query to get complete glossary base w typename, translation etc
const glossaryHack: { [key: string]: string } = {
  de: "glossar",
  en: "glossary",
};

export async function getGlossaryPaths(
  langcode: string
): Promise<ISegmentPath[]> {
  // const query = gql`
  //     query getAllGlossaries($langcode: String) {
  //       glossary(langcode: $langcode) {
  //         ${EntityFields},
  //         ${SlugFields}
  //       }
  //     }
  //   `;

  // const client = await getServiceClient();

  // const glossaryEntries: IGlossaryEntry[] = await client
  //   .request<{ glossary: IGlossaryEntry[] }>(query, {
  //     langcode: langcode,
  //   })
  //   .then(data => data.glossary ?? []);

  return [{ params: { segments: [glossaryHack[langcode]] }, locale: langcode }];
}

export async function getGlossaryBySlug(
  slug: string,
  lang = "de",
  excludeSelf = true
) {
  const query = gql`
    query getGlossary(
      $langcode: String
      $excludeSelf: Boolean
    ) {
      glossary(langcode: $langcode) {
        ${GlossaryFields}
      }
    }
  `;

  const client = await getServiceClient();

  if (Object.values(glossaryHack).indexOf(slug) < 0) return null;

  return client
    .request<{ glossary: IGlossaryEntry[] }>(query, {
      langcode: lang,
      excludeSelf,
    })
    .then(data => transformToGlossary(data.glossary, lang))
    .catch(e => {
      console.warn(e);
      return null;
    });
}

function transformToGlossary(
  entries: IGlossaryEntry[],
  lang: string
): IGlossary {
  const groupedEntries = entries.reduce(function (
    glossaryArray: { [key: string]: IGlossaryEntry[] },
    entry: IGlossaryEntry
  ) {
    const firstChar = entry.label[0].toUpperCase();
    (glossaryArray[firstChar] = glossaryArray[firstChar] || []).push(entry);
    return glossaryArray;
  },
  {});
  const groups = Object.entries(groupedEntries)
    .map(([abbrev, glossaries]) => {
      return { abbrev, glossaries };
    })
    .sort((a, b) => a.abbrev.localeCompare(b.abbrev));

  const translations = Object.entries(glossaryHack)
    .filter(([k, v]) => k !== lang)
    .map(([langcode, slug]) => ({
      langcode,
      slug,
      urlpath: slug,
      urlsegments: [slug],
    }));

  return {
    typeName: "Glossary",
    langcode: lang,
    translations,
    groups,
  };
}

export async function getGlossaryEntryBySlug(
  slug: string,
  lang = "de",
  excludeSelf = true
) {
  const query = gql`
    query getGlossaryEntryBySlug(
      $slug: String!
      $srcLang: String
      $dstLang: String
      $excludeSelf: Boolean
    ) {
      glossaryEntryBySlug(slug: $slug, srcLang: $srcLang, dstLang: $dstLang) {
        ${GlossaryFields}
      }
    }
  `;

  const client = await getServiceClient();

  return client
    .request<{ glossaryEntryBySlug: IGlossaryEntry }>(query, {
      srcLang: lang,
      dstLang: lang,
      slug: "/" + slug,
      excludeSelf,
    })
    .then(data => data.glossaryEntryBySlug)
    .catch(e => {
      console.warn(e);
      return null;
    });
}
