import { IGlossaryGroup } from "@/modules/editorial/types";
import { GlossaryTerm } from "./GlossaryTerm";
import { useState, useEffect } from "react";
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
  const [termUpdated, setTermUpdated] = useState("");
  useEffect(() => {
    setTermUpdated(selectedTerm ?? "");
  }, [selectedTerm]);

  return (
    <>
      <div className="bx--row bx--row-padding px-s-md">
        <div className="bx--col-md-4 hedi-glossary-letterhead">
          {glossaryGroup.key}
        </div>
      </div>
      <div className="bx--row">
        {glossaryGroup.terms.map(term => (
          <div className="bx--col-md-4" key={term.route}>
            <GlossaryTerm
              glossaryTerm={term}
              translationLang={translationLang}
              selected={term.route.endsWith(termUpdated, term.route.length)}
            />
          </div>
        ))}
      </div>
      <div className="hedi-separator"></div>
    </>
  );
};
