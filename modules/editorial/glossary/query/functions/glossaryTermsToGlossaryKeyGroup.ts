import { IGlossary, IGlossaryKeyGroup, IGlossaryTerm } from "../../types";

export async function glossaryTermsToGlossaryKeyGroup(
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
  const glossaryKeyGroups = Object.entries(groupedEntries)
    .map(([keyChar, terms]) => {
      return { keyChar, terms };
    })
    .sort((a, b) => a.keyChar.localeCompare(b.keyChar));

  return glossaryKeyGroups as IGlossaryKeyGroup[];
}
