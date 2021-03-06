import { GlossaryTerm } from "../GlossaryTerm";
import { Row, Column } from "carbon-components-react";
import { Seperator } from "@/modules/common/components";
import { IGlossaryGroupProps, useGlossaryGroup } from "./useGlossaryGroup";

export const GlossaryGroup = (props: IGlossaryGroupProps): JSX.Element => {
  const {
    glossaryKey,
    glossaryTerms,
    translationLang,
    termUpdated,
  } = useGlossaryGroup(props);

  return (
    <>
      <Row className="hedi--glossary__group--title">
        <Column className="hedi--glossary__group--letter" id={glossaryKey}>
          {glossaryKey}
        </Column>
      </Row>
      <Seperator />
      <Row className="bx--row">
        {glossaryTerms.map(term => (
          <Column md={4} key={term.route}>
            <GlossaryTerm
              glossaryTerm={term}
              translationLang={translationLang}
              isSelected={
                termUpdated !== "" && term.route.endsWith(termUpdated)
              }
            />
          </Column>
        ))}
      </Row>
    </>
  );
};
