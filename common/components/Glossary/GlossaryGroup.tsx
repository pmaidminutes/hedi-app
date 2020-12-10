import { IGlossaryEntry, IGroupGlossary } from "@/modules/editorial/types";
import { GlossaryEntry } from "./GlossaryEntry";
interface GlossaryGroupProps {
  glossaryGroup: IGroupGlossary;
  glossaryUrlTerm: string;
  defaultLocale: string;
}
export const GlossaryGroup = (props: GlossaryGroupProps) => {
  const glossaryGroup = props.glossaryGroup;

  return (
    <>
      <div className="bx--row bx--row-padding px-s-md">
        <div className="bx--col-md-4 hedi-glossary-letterhead">
          <div className="bx--aspect-ratio">{glossaryGroup.abbrev}</div>
        </div>
      </div>

      {glossaryGroup.glossaries.map((glossaryItem: IGlossaryEntry, index) => (
        <GlossaryEntry
          key={index}
          entryIndex={index}
          glossaryItem={glossaryItem}
          glossaryUrlTerm={props.glossaryUrlTerm}
          defaultLocale={props.defaultLocale}
        />
      ))}
      <div className="hedi-separator"></div>
    </>
  );
};
