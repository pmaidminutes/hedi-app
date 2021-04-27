import { GlossaryTerm } from "../GlossaryTerm";
import { Row, Column } from "carbon-components-react";
import { Seperator } from "@/modules/common/components";
import { IGlossaryGroupProps, useGlossaryGroup } from "./useGlossaryGroup";

export const GlossaryGroup = (props: IGlossaryGroupProps): JSX.Element => {
  const {
    groupKey,
    groupTerms,
    translationLang,
    termUpdated,
  } = useGlossaryGroup(props);

  return (
    <>
      <Row>
        <Column>{groupKey}</Column>
      </Row>
      <Row className="bx--row">
        {groupTerms.map(term => (
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
