import { getGlossaryPaths } from "@/modules/editorial/glossaries";
import { IGlossaryEntry } from "@/modules/editorial/types";
import { ParsedUrlQuery } from "querystring";
interface IGlossaryUrls extends ParsedUrlQuery {
  glossaryLocalized: string;
  glossaryTerm: string;
}
export interface IGlossaryPaths {
  params: IGlossaryUrls;
  locale: string;
}

export const getStaticPaths = async (locales: string[]) => {
  const paths: IGlossaryPaths[] = [];
  if (locales) {
    for (let locale of locales) {
      const glossaryPaths = await getGlossaryPaths(locale);
      paths.push(...glossaryPaths);
    }
  }
  return paths;
};

export function reDesignStaticGlossaryPaths(
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
    params: { glossaryLocalized: slugArray[1], glossaryTerm: slugArray[2] },
    locale: locale,
  };
}

export async function getStaticProps(entries: IGlossaryEntry[]) {
  const groupedEntries = entries.reduce(function (
    glossaryArray: any,
    entry: IGlossaryEntry
  ) {
    const firstChar = entry.label[0].toUpperCase();
    (glossaryArray[firstChar] = glossaryArray[firstChar] || []).push(entry);
    return glossaryArray;
  },
  {});
  return Object.entries(groupedEntries)
    .map(([abbrev, glossaries]) => {
      return { abbrev, glossaries };
    })
    .sort((a, b) => a.abbrev.localeCompare(b.abbrev));
}
