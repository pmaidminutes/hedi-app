import { IGlossaryEntry, IGlossaryItem } from "../types";

export function reorderGlossaryView(entries: IGlossaryItem[]) {
  const groupedEntries = entries.reduce(function (
    glossaryArray: any,
    entry: IGlossaryItem
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
