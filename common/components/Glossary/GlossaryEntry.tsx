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
  const glossaryItem = props.glossaryItem;
  const glossaryUrlTerm = props.glossaryUrlTerm;
  return (
    <div className="bx--tile-container">
      <div className="bx--row">
        <div className="bx--col-md-4">
          <ExpandableTile
            title={glossaryItem.label}
            expanded={glossaryUrlTerm === glossaryItem.label}>
            <TileAboveTheFoldContent>
              <a href={"#" + glossaryItem.label}></a>{" "}
              <h2>{glossaryItem.label}</h2>
              {glossaryItem.translations.map(
                (translation: IGlossaryEntry, index) =>
                  translation.langcode === props.defaultLocale ? (
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
            </TileAboveTheFoldContent>
            <TileBelowTheFoldContent>
              <div
                dangerouslySetInnerHTML={{
                  __html: glossaryItem.body,
                }}></div>
            </TileBelowTheFoldContent>
          </ExpandableTile>
        </div>{" "}
      </div>{" "}
    </div>
  );
};
