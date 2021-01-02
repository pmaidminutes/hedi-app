import { IGlossaryGroup } from "@/modules/editorial/types";
import { GlossaryTerm } from "./GlossaryTerm";
interface GlossaryGroupProps {
  glossaryGroup: IGlossaryGroup;
  translationLang?: string;
  selectedTerm?: string;
}
export const GlossaryGroup = ({
  glossaryGroup,
  translationLang,
  selectedTerm,
}: GlossaryGroupProps) => {
  return (
    <>
      <div className="bx--row bx--row-padding px-s-md">
        <div className="bx--col-md-4 hedi-glossary-letterhead">
          {glossaryGroup.key}
        </div>
      </div>
      <div className="bx--row">
        {glossaryGroup.terms.map(term => (
          <div className="bx--col-md-4" key={term.slug}>
            <GlossaryTerm
              glossaryTerm={term}
              translationLang={translationLang}
              selected={
                selectedTerm !== undefined && term.slug.endsWith(selectedTerm)
              }
            />
          </div>
        ))}
      </div>
      <div className="hedi-separator"></div>
    </>
  );
};
