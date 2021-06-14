import { ITyped } from "@/modules/model";
import { SearchView } from "./SearchView";

export const TrySearch = ({
  content,
}: {
  content: ITyped;
}): JSX.Element | null =>
  content.type === "Search" ? (
    // TODO type after removing app page
    <SearchView content={content as any} />
  ) : null;
