import { ICopyLinkToClipboard } from "@/modules/common/components/CopyLinkToClipboard/transformCopyLinkToClipboard";
import { AssertClientSide } from "@/modules/common/utils";
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
  const entryId = AssertClientSide()
    ? window.location.hash.substr(1)
    : undefined;

  const translation = glossaryTerm.translations.find(
    term => term.lang === translationLang
  )?.label;

  const termClass = isSelected
    ? "hedi--glossary-term hedi--glossary-term__marked-word"
    : "hedi--glossary-term";
  const glossaryTermId = route.split("/").pop();
  const headline: IHeadlineComponent & ICopyLinkToClipboard = {
    kind: "Headline",
    headline: "h2",
    text: label,
    route,
    type: "icon",
    size: "sm",
    id: glossaryTermId,
  };
  const modifiedRoute = route.replace(
    "/" + glossaryTermId,
    "#" + glossaryTermId
  );
  return {
    glossaryTermId,
    label,
    body,
    entryId,
    isSelected,
    termClass,
    translation,
    route: modifiedRoute,
    headline,
  };
}
