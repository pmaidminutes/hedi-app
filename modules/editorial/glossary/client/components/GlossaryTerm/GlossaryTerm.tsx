import {
  ExpandableTile,
  TileAboveTheFoldContent,
  TileBelowTheFoldContent,
} from "carbon-components-react";
import { HTMLWithNextImage } from "@/modules/react/html";
import {
  transformGlossaryTerm,
  IGlossaryTermProps,
} from "./transformGlossaryTerm";

export const GlossaryTerm = (props: IGlossaryTermProps): JSX.Element => {
  const {
    label,
    entryId,
    isSelected,
    termClass,
    translation,
    body,
  } = transformGlossaryTerm(props);

  return (
    <ExpandableTile
      title={label}
      id={entryId}
      tabIndex={0}
      expanded={isSelected}>
      <TileAboveTheFoldContent>
        <h2
          className={termClass}
          dangerouslySetInnerHTML={{
            __html: label,
          }}></h2>
        {translation && (
          <p>
            <mark>{translation}</mark>
          </p>
        )}
      </TileAboveTheFoldContent>
      <TileBelowTheFoldContent>
        <HTMLWithNextImage data={body} />
      </TileBelowTheFoldContent>
    </ExpandableTile>
  );
};
