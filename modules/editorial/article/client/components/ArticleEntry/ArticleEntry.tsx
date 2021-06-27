import { HTML } from "@/modules/react/html";
import { ClickableTile } from "carbon-components-react";
import { BreadCrumb } from "@/modules/shell/client/components";
import Link from "next/link";
import {
  transformArticleEntry,
  IArticleEntryProps,
} from "./transformArticleEntry";

export const ArticleEntry = (props: IArticleEntryProps): JSX.Element => {
  const { label, route, breadcrumbData } = transformArticleEntry(props);
  return (
    <div className="hedi--article-entry">
      <Link href={route} passHref>
        <ClickableTile href={route} light={true}>
          <div className="hedi--article-entry__content">
            <BreadCrumb {...breadcrumbData} />
            {/* TODO: check if h4 is right for hierachy */}
            <h4
              dangerouslySetInnerHTML={{
                __html: label,
              }}></h4>
          </div>
        </ClickableTile>
      </Link>
    </div>
  );
};
[];
