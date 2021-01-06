import {
  ExpandableTile,
  TileAboveTheFoldContent,
  TileBelowTheFoldContent,
} from "carbon-components-react";
import { HTML } from "@/common/html";
import { IGlossaryTerm } from "../../../types";

interface GlossaryProps {
  glossaryTerm: IGlossaryTerm;
  translationLang?: string;
  selected?: boolean;
}

export const GlossaryTerm = (props: GlossaryProps) => {
  const { glossaryTerm, translationLang, selected } = props;
  const entryId = glossaryTerm.route.substring(
    glossaryTerm.route.lastIndexOf("/") + 1
  );
  const translated = glossaryTerm.translations.find(
    g => g.lang === translationLang
  )?.label;
  return (
    <ExpandableTile
      title={glossaryTerm.label}
      id={entryId}
      tabIndex={0}
      expanded={selected}>
      <TileAboveTheFoldContent>
        <h2
          className={selected ? "hedi-marked-word" : ""}
          dangerouslySetInnerHTML={{
            __html: glossaryTerm.label,
          }}></h2>
        {translated && (
          <p>
            <mark>{translated}</mark>
          </p>
        )}
      </TileAboveTheFoldContent>
      <TileBelowTheFoldContent>
        <HTML data={glossaryTerm.body} />
      </TileBelowTheFoldContent>
    </ExpandableTile>
  );
};
