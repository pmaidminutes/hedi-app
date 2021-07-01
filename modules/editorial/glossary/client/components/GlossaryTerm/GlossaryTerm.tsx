import { HTML } from "@/modules/react/html";

import { transformGlossaryTerm, IGlossaryTermProps } from "..";
import { HeadlineWithLinkCopy } from "@/modules/common/components";

export const GlossaryTerm = (props: IGlossaryTermProps): JSX.Element => {
  const {
    glossaryTermId,
    label,
    body,
    entryId,
    isSelected,
    termClass,
    translation,
    route,
    headline,
  } = transformGlossaryTerm(props);
  return (
    <div className={termClass} id={glossaryTermId}>
      <HeadlineWithLinkCopy {...headline} />

      <div>
        {translation && (
          <p className="hedi--glossary__marked-translation">{translation}</p>
        )}
      </div>

      <HTML data={body} />
    </div>
  );
};
