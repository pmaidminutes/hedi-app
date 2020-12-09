import {
  getGlossaries,
  getGlossaryPaths,
} from "@/modules/editorial/glossaries";
import { IGlossaryEntry, IGroupGlossary } from "@/modules/editorial/types";
import { ParsedUrlQuery } from "querystring";
interface IGlossaryUrls extends ParsedUrlQuery {
  glossaryLocalized: string;
}
export interface IGlossaryPaths {
  params: IGlossaryUrls;
  locale: string;
}

export const getStaticPaths = async (locales: string[]) => {
  const paths: IGlossaryPaths[] = [];
  if (locales) {
    for (let locale of locales) {
      const glossaryPaths: IGlossaryPaths[] = await getGlossaryPaths(locale);
      paths.push(...glossaryPaths);
    }
  }
  return paths;
};

export async function getStaticProps(locale: string) {
  const entries: IGlossaryEntry[] = await getGlossaries(locale);
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
    .sort((a, b) => a.abbrev.localeCompare(b.abbrev)) as IGroupGlossary[];
}
