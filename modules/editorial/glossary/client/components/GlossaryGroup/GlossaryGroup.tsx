import { useState, useEffect } from "react";
import { IGlossaryGroup } from "../../../types";
import { GlossaryTerm } from "../GlossaryTerm";
import { Row, Column } from "carbon-components-react";
import { Seperator } from "@/modules/common/components";
interface GlossaryGroupProps {
  glossaryGroup: IGlossaryGroup;
  translationLang?: string;
  selectedTerm?: string;
}
export const GlossaryGroup = ({
  glossaryGroup,
  translationLang,
  selectedTerm,
}: GlossaryGroupProps): JSX.Element => {
  const [termUpdated, setTermUpdated] = useState("");
  useEffect(() => {
    setTermUpdated(selectedTerm ?? "");
  }, [selectedTerm]);
  return (
    <>
      <Row>
        <Column>{glossaryGroup.key}</Column>
      </Row>
      <Row className="bx--row">
        {glossaryGroup.terms.map(term => (
          <Column md={4} key={term.route}>
            <GlossaryTerm
              glossaryTerm={term}
              translationLang={translationLang}
              isSelected={
                termUpdated !== "" &&
                term.route.endsWith(termUpdated, term.route.length)
              }
            />
          </Column>
        ))}
      </Row>
      <Seperator />
    </>
  );
};
