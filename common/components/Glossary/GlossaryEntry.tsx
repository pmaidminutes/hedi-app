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

function replaceUmlauts(str: string) {
  return str
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue");
}

export const GlossaryEntry = (props: GlossaryProps) => {
  const { glossaryItem, glossaryUrlTerm, defaultLocale } = props;
  return (
    <div className="bx--col-md-4">
      <ExpandableTile
        title={glossaryItem.label}
        id={replaceUmlauts(glossaryItem.label)}
        tabIndex={0}>
        <TileAboveTheFoldContent>
          <div style={{ height: "100px" }}>
            <h2>{glossaryItem.label}</h2>
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
