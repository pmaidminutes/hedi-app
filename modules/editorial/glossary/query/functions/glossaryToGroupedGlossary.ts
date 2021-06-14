import { IGlossary, IGlossaryKeyGroup, IGlossaryTerm } from "../../types";

export async function glossaryToGroupedGlossary(
  glossary: IGlossary
): Promise<IGlossaryKeyGroup[]> {
  const groupedEntries = glossary.glossaryTerms.reduce(function (
    keyChar: { [keyChar: string]: IGlossaryTerm[] },
    term: IGlossaryTerm
  ) {
    const firstChar = term.label[0].toUpperCase();
    (keyChar[firstChar] = keyChar[firstChar] || []).push(term);
    return keyChar;
  },
  {});
  const groups = Object.entries(groupedEntries)
    .map(([keyChar, terms]) => {
      return { keyChar, terms };
    })
    .sort((a, b) => a.keyChar.localeCompare(b.keyChar));

  return groups as IGlossaryKeyGroup[];
}
