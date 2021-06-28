import Link from "next/link";
import { HTML } from "@/modules/react/html";

import { transformGlossaryTerm, IGlossaryTermProps } from "..";
import { Row, Column, ClickableTile } from "carbon-components-react";
export const GlossaryTermEntry = (props: IGlossaryTermProps): JSX.Element => {
  const { label, body, translation, route } = transformGlossaryTerm(props);

  return (
    <>
      <Row className="hedi--article-teaser__entry">
        <Column sm={4} md={6} lg={12}>
          <Link href={route} passHref>
            <ClickableTile href={route} light={true}>
              <div className="hedi--article-teaser__entry--grid--content">
                <h4>
                  <HTML data={label} />
                </h4>
                <div>{translation && <p>{translation}</p>}</div>
                <div className="hedi--article-teaser__entry--grid--content--text-wrap">
                  <HTML data={body} />
                </div>
              </div>
            </ClickableTile>
          </Link>
        </Column>
      </Row>
    </>
  );
};
