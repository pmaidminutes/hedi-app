import { IGlossary } from "../../../types";
import { useRouter } from "next/router";
import { AssertClientSide } from "@/modules/common/utils";
export interface IGlossaryProps {
  content: IGlossary;
}
export function transformGlossary(props: IGlossaryProps) {
  const { defaultLocale } = useRouter();
  const { content } = props;
  const { terms } = content;
  const glossaryUrlTerm = AssertClientSide()
    ? window.location.hash.substr(1)
    : undefined;

  if (glossaryUrlTerm) {
    // Use the hash to find the first element with that id
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

  return { terms, defaultLocale, glossaryUrlTerm };
}
