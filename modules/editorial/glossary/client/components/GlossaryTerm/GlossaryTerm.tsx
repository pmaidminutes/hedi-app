import { useRouter } from "next/router";
import {
  ExpandableTile,
  TileAboveTheFoldContent,
  TileBelowTheFoldContent,
} from "carbon-components-react";
import { HTMLWithNextImage } from "@/modules/react/html";
import { IGlossaryTerm } from "../../../types";

interface GlossaryProps {
  glossaryTerm: IGlossaryTerm;
  translationLang?: string;
  isSelected?: boolean;
}

export const GlossaryTerm = (props: GlossaryProps): JSX.Element => {
  const router = useRouter();
  const { locale, defaultLocale } = router;
  const { glossaryTerm, translationLang, isSelected } = props;
  const { label, body } = glossaryTerm;
  const entryId = glossaryTerm.route.substring(
    glossaryTerm.route.lastIndexOf("/") + 1
  );
  const translation = glossaryTerm.translations.find(
    g => g.lang === translationLang
  )?.label;
  return (
    <ExpandableTile
      title={label}
      id={entryId}
      tabIndex={0}
      expanded={isSelected}>
      <TileAboveTheFoldContent>
        <h2
          className={isSelected ? "hedi-marked-word" : ""}
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
        <HTMLWithNextImage
          data={body}
          locale={locale === defaultLocale ? null : locale}
        />
      </TileBelowTheFoldContent>
    </ExpandableTile>
  );
};
