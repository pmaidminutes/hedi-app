import { IGlossaryEntry } from "@/modules/editorial/types";
import {
  ExpandableTile,
  TileAboveTheFoldContent,
  TileBelowTheFoldContent,
} from "carbon-components-react";

interface GlossaryProps {
  glossaryEntry: IGlossaryEntry;
  translationLang?: string;
  selected?: boolean;
}

export const GlossaryEntry = (props: GlossaryProps) => {
  const { glossaryEntry, translationLang, selected } = props;
  const entryId = glossaryEntry.slug.substring(
    glossaryEntry.slug.lastIndexOf("/") + 1
  );
  const translated = glossaryEntry.translations.find(
    g => g.langcode === translationLang
  )?.label;
  return (
    <ExpandableTile
      title={glossaryEntry.label}
      id={entryId}
      tabIndex={0}
      expanded={selected}>
      <TileAboveTheFoldContent>
        <h2
          className={selected ? "hedi-marked-word" : ""}
          dangerouslySetInnerHTML={{
            __html: glossaryEntry.label,
          }}></h2>
        {translated && (
          <p>
            <mark>{translated}</mark>
          </p>
        )}
      </TileAboveTheFoldContent>
      <TileBelowTheFoldContent>
        <div
          dangerouslySetInnerHTML={{
            __html: glossaryEntry.body,
          }}></div>
      </TileBelowTheFoldContent>
    </ExpandableTile>
  );
};
