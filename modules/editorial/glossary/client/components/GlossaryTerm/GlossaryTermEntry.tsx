import Link from "next/link";
import { HTML } from "@/modules/react/html";

import {
  transformGlossaryTerm,
  IGlossaryTermProps,
} from "./transformGlossaryTerm";
import { ClickableTile } from "carbon-components-react";

export const GlossaryTermEntry = (props: IGlossaryTermProps): JSX.Element => {
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
      <div className="hedi--article-entry">
        <div className="hedi--article-entry__content">
          <Link href={route} passHref>
            <ClickableTile href={route} light={true}>
              <h2>
                <HTML data={label} />
              </h2>
              <div>
                {translation && (
                  <p>
                    <mark>{translation}</mark>
                  </p>
                )}
              </div>
              <HTML data={body} />
            </ClickableTile>
          </Link>
        </div>
      </div>
    </>
  );
};
