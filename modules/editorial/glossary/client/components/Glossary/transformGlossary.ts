import { Router, useRouter } from "next/router";
import { AssertClientSide } from "@/modules/common/utils";
import { IGlossaryProps } from "./Glossary";

export function transformGlossary(props: IGlossaryProps) {
  const { defaultLocale } = useRouter();
  const router = useRouter();
  const { glossaryKeyGroups } = props;
  const glossaryUrlTerm = AssertClientSide()
    ? window.location.hash.substr(1)
    : undefined;

  if (glossaryUrlTerm) {
    const element = document.querySelector(glossaryUrlTerm);
    const handExitComplete = (): void => {
      if (element) {
        // Smooth scroll to that elment
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      }
    };
    router.events.on("routeChangeComplete", handExitComplete);
  }

  return { glossaryKeyGroups, defaultLocale, glossaryUrlTerm };
}
