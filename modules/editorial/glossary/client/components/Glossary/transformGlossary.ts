import { useRouter } from "next/router";
import { AssertClientSide } from "@/modules/common/utils";
import { IGlossaryProps } from "./Glossary";

export function transformGlossary(props: IGlossaryProps) {
  const { defaultLocale } = useRouter();
  const { glossaryKeyGroups } = props;
  const glossaryUrlTerm = AssertClientSide()
    ? window.location.hash.substr(1)
    : undefined;

  if (glossaryUrlTerm) {
    const element = document.querySelector(glossaryUrlTerm);
    if (element) {
      // Smooth scroll to that elment
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  }

  return { glossaryKeyGroups, defaultLocale, glossaryUrlTerm };
}
