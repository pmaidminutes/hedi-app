import { ITypename } from "@/common/model/cms";
import { AssertClientSide } from "@/common/utils";
import { IGlossary } from "@/modules/editorial/types";
import { useRouter } from "next/router";
import { GlossaryGroup } from "./GlossaryGroup";

interface IGlossaryProps {
  content: IGlossary;
}

export const TryGlossary = (content: ITypename) =>
  content.typeName === "Glossary" ? (
    <Glossary content={content as IGlossary} />
  ) : null;

export const Glossary = ({ content }: IGlossaryProps) => {
  const { groups } = content;
  const { defaultLocale } = useRouter();

  let glossaryUrlTerm = AssertClientSide()
    ? window.location.hash.substr(1)
    : "";

  //TODO to include hash value to anchor on page load, hash in URL doesnt work

  return (
    <div className="bx--grid">
      {groups.map((glossaryGroup, index) => (
        <GlossaryGroup
          key={index}
          glossaryGroup={glossaryGroup}
          glossaryUrlTerm={`${glossaryUrlTerm}`}
          defaultLocale={defaultLocale ?? "de"}
        />
      ))}
    </div>
  );
};
