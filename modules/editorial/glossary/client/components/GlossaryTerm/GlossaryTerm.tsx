import { HTML } from "@/modules/react/html";

import {
  transformGlossaryTerm,
  IGlossaryTermProps,
} from "./transformGlossaryTerm";
import { CopyLinkToClipboard } from "@/modules/common/components";
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
  } = transformGlossaryTerm(props);

  return (
    <>
      <Row>
        <Column>
          <h2>
            <HTML data={label} />
          </h2>
        </Column>
        <Column style={{ maxWidth: "20%" }}>
          <CopyLinkToClipboard
            type="actionbaritem"
            description="kopieren"
            route={route}
          />
        </Column>
      </Row>
      <div>
        {translation && (
          <p>
            <mark>{translation}</mark>
          </p>
        )}
      </div>

      <HTML data={body} />
    </>
  );
};
