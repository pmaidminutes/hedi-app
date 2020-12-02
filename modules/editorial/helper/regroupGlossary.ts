import { IGlossaryEntry } from "../types";

export function reorderGlossaryView(entries: IGlossaryEntry[]) {
  const groupedEntries = entries.reduce(function (rv: any, x: IGlossaryEntry) {
    const firstChar = x.label[0].toUpperCase();
    (rv[firstChar] = rv[firstChar] || []).push(x);
    return rv;
  }, {});
  return Object.entries(groupedEntries)
    .map(([abbrev, glossaries]) => {
      return { abbrev, glossaries };
    })
    .sort((a, b) => a.abbrev.localeCompare(b.abbrev));
}
