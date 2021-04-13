import { IAppPage } from "@/modules/common/types";
import { ITyped } from "@/modules/model";
import { SearchView } from "./SearchView";

export const TrySearch = ({
  content,
}: {
  content: ITyped;
}): JSX.Element | null =>
  content.type === "Search" ? (
    <SearchView content={content as IAppPage} />
  ) : null;
