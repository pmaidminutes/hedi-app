import { getServiceClient, gql } from "@/common/graphql";
import { IEntityLocalized, EntityLocalizedFields } from "@/common/model/cms";
import { ISegmentPath, routeToSegments } from "@/common/types";
import {
  GlossaryTermFields,
  IGroupedGlossary,
  IGlossary,
  IGlossaryTerm,
  GlossaryFields,
} from "@/modules/editorial/glossary/types";

export async function getGlossaryPath(lang: string): Promise<ISegmentPath[]> {
  const query = gql`
    query getGlossary($lang: String) {
      glossary(lang: $lang) {
        ${EntityLocalizedFields}
      }
    }
  `;

  const client = await getServiceClient();
  const segments = await client
    .request<{ glossary?: IEntityLocalized }>(query, { lang })
    .then(data => routeToSegments(data.glossary?.route));

  return [{ params: { segments }, locale: lang }];
}

export async function getGlossary(route: string, lang = "de") {
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

function glossaryToGroupedGlossary(glossary: IGlossary): IGroupedGlossary {
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

  return { ...glossary, groups };
}

export async function getGlossaryTerm(route: string, lang = "de") {
  const query = gql`
    query getGlossaryTerm(
      $routes: [String]!
      $lang: String
      $includeSelf: Boolean
    ) {
      glossaryterms(routes: $routes, lang: $lang) {
        ${GlossaryTermFields}
      }
    }
  `;

  const client = await getServiceClient();
  return client
    .request<{ glossaryterms: IGlossaryTerm[] }>(query, {
      routes: [route],
      lang,
    })
    .then(data => data.glossaryterms?.[0])
    .catch(e => {
      console.warn(e);
      return null;
    });
}
