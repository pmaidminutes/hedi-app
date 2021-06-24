import { HTML } from "@/modules/react/html";

import {
  transformGlossaryTerm,
  IGlossaryTermProps,
} from "./transformGlossaryTerm";

export const GlossaryTerm = (props: IGlossaryTermProps): JSX.Element => {
  const {
    label,
    body,
    entryId,
    isSelected,
    termClass,
    translation,
  } = transformGlossaryTerm(props);

  return (
    <>
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
    </>
  );
};
