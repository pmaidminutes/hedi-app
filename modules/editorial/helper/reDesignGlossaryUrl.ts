import { IGlossaryEntry, IGlossaryPaths } from "../types";

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
