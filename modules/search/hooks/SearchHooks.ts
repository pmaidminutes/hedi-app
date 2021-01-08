import { IHTTPError } from "@/common/types";
import { jsonFetcher } from "@/common/utils";
import { IArticle } from "@/modules/editorial/article/types";
import useSWR from "swr";
// TODO change from
import { ICategory } from "../../editorial/category/types";
import { ISuggestEntry } from "../types";

export function useSearch(
  searchText: string,
  lang: string = "de",
  entityType?: string
) {
  const apiPath = "/api/" + lang + "/search/";

  const swrResult = useSWR<IHTTPError | (IArticle | ICategory)[]>(
    searchText?.length > 3
      ? apiPath + encodeURI(searchText + "/" + entityType)
      : null,
    jsonFetcher
  );
  return { ...swrResult };
}

export function useSuggest(suggestText?: string) {
  const swrResult = useSWR<IHTTPError | ISuggestEntry[]>(
    suggestText ? "/api/en/suggest/" + encodeURI(suggestText) : null,
    url =>
      jsonFetcher<any>(url).then(
        response =>
          response.suggest.en[suggestText ? suggestText : "default"].suggestions
      )
  );
  return { ...swrResult };
}
