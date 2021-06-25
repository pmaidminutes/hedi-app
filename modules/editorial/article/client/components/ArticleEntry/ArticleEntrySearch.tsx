import { HTML } from "@/modules/react/html";
import { ClickableTile } from "carbon-components-react";
import { BreadCrumb } from "@/modules/shell/client/components";
import Link from "next/link";
import {
  transformArticleEntry,
  IArticleEntryProps,
} from "./transformArticleEntry";
import { HeadlineWithLinkCopy } from "@/modules/common/components";

export const ArticleEntrySearch = (props: IArticleEntryProps): JSX.Element => {
  const { route, breadcrumbData, summary, headline } = transformArticleEntry(
    props
  );

  return (
    <div className="hedi--article-entry">
      <div className="hedi--article-entry__content">
        <Link href={route} passHref>
          <ClickableTile href={route} light={true}>
            <BreadCrumb {...breadcrumbData} />
            <HeadlineWithLinkCopy {...headline} />

            <HTML data={summary} />
          </ClickableTile>
        </Link>
      </div>
    </div>
  );
};
[];
