import { IGlossary, IGlossaryGrouped, IGlossaryTerm } from "../../types";

export function glossaryToGroupedGlossary(
  glossary: IGlossary
): IGlossaryGrouped {
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
