import { ITyped } from "@/common/model/cms";
import { AssertClientSide } from "@/common/utils";
import { IGroupedGlossary } from "@/modules/editorial/types";
import { useRouter } from "next/router";
import { GlossaryGroup } from "./GlossaryGroup";

interface IGlossaryProps {
  content: IGroupedGlossary;
}

export const TryGlossary = (content: ITyped) =>
  content.type === "Glossary" ? (
    <Glossary content={content as IGroupedGlossary} />
  ) : null;

export const Glossary = ({ content }: IGlossaryProps) => {
  const { groups } = content;
  const { defaultLocale } = useRouter();

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

  //TODO to include hash value to anchor on page load, hash in URL doesnt work

  return (
    <div className="bx--grid">
      {groups.map(glossaryGroup => (
        <GlossaryGroup
          key={glossaryGroup.key}
          glossaryGroup={glossaryGroup}
          translationLang={defaultLocale}
          selectedTerm={glossaryUrlTerm}
        />
      ))}
    </div>
  );
};
