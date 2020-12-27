import {
  ExpandableTile,
  TileAboveTheFoldContent,
  TileBelowTheFoldContent,
} from "carbon-components-react";
import { HTML } from "@/common/html";
import { IGlossaryEntry } from "@/modules/editorial/types";

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
        <HTML data={glossaryEntry.body} />
      </TileBelowTheFoldContent>
    </ExpandableTile>
  );
};
