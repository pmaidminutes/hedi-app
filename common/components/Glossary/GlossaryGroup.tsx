import { IGlossaryGroup } from "@/modules/editorial/types";
import { GlossaryEntry } from "./GlossaryEntry";
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
          {glossaryGroup.abbrev}
        </div>
      </div>
      <div className="bx--row">
        {glossaryGroup.glossaries.map(glossaryEntry => (
          <div className="bx--col-md-4" key={glossaryEntry.slug}>
            <GlossaryEntry
              glossaryEntry={glossaryEntry}
              translationLang={translationLang}
              selected={
                selectedTerm !== undefined &&
                glossaryEntry.slug.endsWith(selectedTerm)
              }
            />
          </div>
        ))}
      </div>
      <div className="hedi-separator"></div>
    </>
  );
};
