import Link from "next/link";
import { HTML } from "@/modules/react/html";
import { HeadlineWithLinkCopy } from "@/modules/common/components";

import { ClickableTile } from "carbon-components-react";
import {
  IGlossaryTermProps,
  transformGlossaryTerm,
} from "./transformGlossaryTerm";

export const GlossaryTermEntry = (props: IGlossaryTermProps): JSX.Element => {
  const { body, route, headline } = transformGlossaryTerm(props);

  return (
    <>
      <div className="hedi--article-entry">
        <div className="hedi--article-entry__content">
          <Link href={route} passHref>
            <ClickableTile href={route} light={true}>
              <HeadlineWithLinkCopy {...headline} />
              <HTML data={body} />
            </ClickableTile>
          </Link>
        </div>
      </div>
    </>
  );
};
