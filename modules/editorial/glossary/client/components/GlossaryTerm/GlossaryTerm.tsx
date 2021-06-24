import { HTML } from "@/modules/react/html";

import {
  transformGlossaryTerm,
  IGlossaryTermProps,
} from "./transformGlossaryTerm";
import {
  CopyLinkToClipboard,
  HeadlineWithLinkCopy,
} from "@/modules/common/components";
import { Column, Row } from "carbon-components-react";

export const GlossaryTerm = (props: IGlossaryTermProps): JSX.Element => {
  const {
    label,
    body,
    entryId,
    isSelected,
    termClass,
    translation,
    route,
    headline,
  } = transformGlossaryTerm(props);

  return (
    <>
      <Row>
        <Column>
          <HeadlineWithLinkCopy {...headline} />
        </Column>
      </Row>
      <div>
        {translation && (
          <p className="hedi--glossary__marked-translation">{translation}</p>
        )}
      </div>

      <HTML data={body} />
    </>
  );
};
