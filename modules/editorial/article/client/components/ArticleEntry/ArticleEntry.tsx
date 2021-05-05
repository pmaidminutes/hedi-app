import { HTMLWithNextImage } from "@/modules/react/html";
import { ClickableTile } from "carbon-components-react";
import Link from "next/link";
import {
  transformArticleEntry,
  IArticleEntryProps,
} from "./transformArticleEntry";

export const ArticleEntry = (props: IArticleEntryProps): JSX.Element => {
  const { label, summary, route } = transformArticleEntry(props);
  return (
    <Link href={route} passHref>
      <ClickableTile href={route}>
        {/* TODO: check if h4 is right for hierachy */}
        <h4
          dangerouslySetInnerHTML={{
            __html: label,
          }}></h4>
        <HTMLWithNextImage data={summary} />
      </ClickableTile>
    </Link>
  );
};
[];
