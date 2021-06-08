import { HTML } from "@/modules/react/html";
import { ClickableTile } from "carbon-components-react";
import Link from "next/link";
import {
  transformArticleEntry,
  IArticleEntryProps,
} from "./transformArticleEntry";

export const ArticleEntry = (props: IArticleEntryProps): JSX.Element => {
  const { label,  route } = transformArticleEntry(props);
  return (
    <Link href={route} passHref>
      <ClickableTile href={route}>
        {/* TODO: check if h4 is right for hierachy */}
        <h4
          dangerouslySetInnerHTML={{
            __html: label,
          }}></h4>
      </ClickableTile>
    </Link>
  );
};
[];
