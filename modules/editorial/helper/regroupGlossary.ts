import { IGlossaryEntry } from "../types";

export function regroupGlossary(entries: IGlossaryEntry[]) {
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
