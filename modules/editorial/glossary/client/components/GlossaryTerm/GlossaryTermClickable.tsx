import Link from "next/link";

import { transformGlossaryTerm, IGlossaryTermProps, GlossaryTerm } from "..";
import { IGlossaryTerm } from "../../../types";

import { Row, Column, ClickableTile } from "carbon-components-react";
export const GlossaryTermClickable = (
  props: IGlossaryTermProps
): JSX.Element => {
  const { label, body, translation, route } = transformGlossaryTerm(props);

  return (
    <>
      <Row className="hedi--article-teaser__entry">
        <Column sm={4} md={6} lg={12}>
          <Link href={route} passHref>
            <ClickableTile href={route} light={true}>
              <div className="hedi--article-teaser__entry--grid--content">
                <GlossaryTerm
                  glossaryTerm={props.glossaryTerm as IGlossaryTerm}
                />
              </div>
            </ClickableTile>
          </Link>
        </Column>
      </Row>
    </>
  );
};
