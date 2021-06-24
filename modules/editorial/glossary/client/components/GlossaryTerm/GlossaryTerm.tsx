import {
  ExpandableTile,
  TileAboveTheFoldContent,
  TileBelowTheFoldContent,
} from "carbon-components-react";
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
      {termClass}
      {"<--- to be removed"}
      <h2
        className={termClass}
        dangerouslySetInnerHTML={{
          __html: label,
        }}></h2>
      <div>
        {translation && (
          <p>
            <mark>{translation}</mark>
          </p>
        )}
      </div>

      <div
        dangerouslySetInnerHTML={{
          __html: body,
        }}></div>
    </>
  );
};
