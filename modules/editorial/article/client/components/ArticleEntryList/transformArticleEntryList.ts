import { ColumnDefaultProps } from "carbon-components-react";
import { IArticleEntry } from "../../../types";

export interface IArticleEntryListProps {
  articles: IArticleEntry[];
  headline?: string;
  entryType: EntryType;
}
// TODO rename type to entryType or something
export type EntryType = "full" | "normal" | "normal-neighbours" | "minimal";
// entryTypes:
// full: (image), breadcrumb, headline, summary, one element per column
// normal: full + less columns then full
// neighbours: breadcrumb, headline, summary, two elements per column
// minimal: breadcrumb, headline,

export function transformArticleEntryList(props: IArticleEntryListProps) {
  const { articles, headline, entryType } = props;

  // TODO maybey verallgemeinern
  const columnProps: ColumnDefaultProps =
    entryType === "full"
      ? { sm: 4, md: 6, lg: 12 }
      : entryType === "normal-neighbours"
      ? { sm: 4, md: 4, lg: 8 }
      : { sm: 4, md: 5, lg: 10 };

  return { articles, headline, entryType, columnProps };
}
