import { IGlossaryEntry } from "@/modules/editorial/types";
import {
  ExpandableTile,
  TileAboveTheFoldContent,
  TileBelowTheFoldContent,
} from "carbon-components-react";

interface GlossaryProps {
  glossaryItem: IGlossaryEntry;
  glossaryUrlTerm: string;
  defaultLocale: string;
  entryIndex: number;
}

export const GlossaryEntry = (props: GlossaryProps) => {
  const { glossaryItem, defaultLocale, glossaryUrlTerm } = props;
  const entryId = glossaryItem.slug.substring(
    glossaryItem.slug.lastIndexOf("/") + 1
  );
  const selected = entryId === glossaryUrlTerm ? true : false;

  return (
    <div className="bx--col-md-4">
      <ExpandableTile
        title={glossaryItem.label}
        id={entryId}
        tabIndex={0}
        expanded={selected}>
        <TileAboveTheFoldContent>
          <div style={{ height: "100px" }}>
            <h2 className={selected ? "hedi-marked-word" : ""}>
              {glossaryItem.label}
            </h2>
            {glossaryItem.translations.map(
              (translation: IGlossaryEntry, index) =>
                translation.langcode === defaultLocale ? (
                  <p key={index}>
                    <mark> {translation.label}</mark>
                  </p>
                ) : (
                  ""
                )
            )}
            <div
              dangerouslySetInnerHTML={{
                __html: glossaryItem.body,
              }}></div>
          </div>
        </TileAboveTheFoldContent>
        <TileBelowTheFoldContent>
          <div style={{ height: "170px" }}></div>
        </TileBelowTheFoldContent>
      </ExpandableTile>
    </div>
  );
};
