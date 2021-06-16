import { IGlossaryTerm } from "../../../types";

export interface IGlossaryTermProps {
  glossaryTerm: IGlossaryTerm;
  translationLang?: string;
  isSelected?: boolean;
}

export function transformGlossaryTerm(props: IGlossaryTermProps) {
  const { glossaryTerm, translationLang, isSelected } = props;
  const { label, body } = glossaryTerm;
  const entryId = glossaryTerm.route.substring(
    glossaryTerm.route.lastIndexOf("/") + 1
  );
  const translation = glossaryTerm.translations.find(
    term => term.lang === translationLang
  )?.label;

  const termClass = isSelected ? "hedi-marked-word" : "";

  return { label, body, entryId, isSelected, termClass, translation };
}
