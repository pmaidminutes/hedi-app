import { ICopyLinkToClipboard } from "@/modules/common/components/CopyLinkToClipboard/transformCopyLinkToClipboard";
import { IHeadlineComponent } from "@/modules/components";
import { IGlossaryTerm } from "../../../types";

export interface IGlossaryTermProps {
  glossaryTerm: IGlossaryTerm;
  translationLang?: string;
  isSelected?: boolean;
}

export function transformGlossaryTerm(props: IGlossaryTermProps) {
  const { glossaryTerm, translationLang, isSelected } = props;
  const { label, body, route } = glossaryTerm;
  const entryId = glossaryTerm.route.substring(
    glossaryTerm.route.lastIndexOf("/") + 1
  );
  const translation = glossaryTerm.translations.find(
    term => term.lang === translationLang
  )?.label;

  const termClass = isSelected ? "hedi-marked-word" : "";
  const headline: IHeadlineComponent & ICopyLinkToClipboard = {
    kind: "Headline",
    headline: "h2",
    text: label,
    route,
    type: "icon",
    size: "sm",
    id: label,
  };
  return {
    label,
    body,
    entryId,
    isSelected,
    termClass,
    translation,
    route,
    headline,
  };
}
