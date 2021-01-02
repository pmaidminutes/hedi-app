import { getServiceClient, gql } from "@/common/graphql";
import { ISegmentPath } from "@/common/types";
import {
  GlossaryTermFields,
  IGroupedGlossary,
  IGlossary,
  IGlossaryTerm,
  GlossaryFields,
} from "@/modules/editorial/types";

export async function getGlossaryPath(
  langcode: string
): Promise<ISegmentPath[]> {
  const query = gql`
    query getGlossary($langcode: String) {
      glossary(langcode: $langcode) {
        slug
      }
    }
  `;

  const client = await getServiceClient();
  const segment = await client
    .request<{ glossary: { slug?: string } }>(query, {
      langcode: langcode,
    })
    .then(data => {
      const slug = data.glossary.slug ?? "";
      return slug.replace("/", "");
    });

  return [{ params: { segments: [segment] }, locale: langcode }];
}

export async function getGlossary(lang = "de", excludeSelf = true) {
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
  return client
    .request<{ glossary: IGlossary }>(query, {
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
  glossary: IGlossary,
  lang: string
): IGroupedGlossary {
  const groupedEntries = glossary.terms.reduce(function (
    glossaryArray: { [key: string]: IGlossaryTerm[] },
    term: IGlossaryTerm
  ) {
    const firstChar = term.label[0].toUpperCase();
    (glossaryArray[firstChar] = glossaryArray[firstChar] || []).push(term);
    return glossaryArray;
  },
  {});
  const groups = Object.entries(groupedEntries)
    .map(([key, terms]) => {
      return { key, terms };
    })
    .sort((a, b) => a.key.localeCompare(b.key));

  const translations = glossary.translations.map(({ langcode, slug }) => {
    const path = slug.replace("/", "");
    return {
      langcode,
      slug: path,
      urlpath: path,
      urlsegments: [path],
    };
  });

  return {
    typeName: "Glossary",
    langcode: lang,
    translations,
    groups,
  };
}

export async function getGlossaryTermBySlug(
  slug: string,
  lang = "de",
  excludeSelf = true
) {
  const query = gql`
    query getGlossaryTermBySlug(
      $slug: String!
      $srcLang: String
      $dstLang: String
      $excludeSelf: Boolean
    ) {
      glossaryTermBySlug(slug: $slug, srcLang: $srcLang, dstLang: $dstLang) {
        ${GlossaryTermFields}
      }
    }
  `;

  const client = await getServiceClient();
  return client
    .request<{ glossaryTermBySlug: IGlossaryTerm }>(query, {
      srcLang: lang,
      dstLang: lang,
      slug,
      excludeSelf,
    })
    .then(data => data.glossaryTermBySlug)
    .catch(e => {
      console.warn(e);
      return null;
    });
}
