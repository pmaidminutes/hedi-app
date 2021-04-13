import { IHTTPError } from "@/modules/common/error";
import { jsonFetcher } from "@/modules/common/utils";
import { IArticle } from "@/modules/editorial/article/types";
import { ICategory } from "@/modules/editorial/category/types";
import { IGlossaryTerm } from "@/modules/editorial/glossary/types/glossary";
import { IPage } from "@/modules/editorial/page/types";
import useSWR from "swr";
import { ISuggestEntry } from "../../types";
import { searchAPIUrl, suggestAPIUrl } from "../../types";

export function useSearch(
  searchText: string,
  lang: string = "de",
  location: string,
  distance: string,
  searchFilter?: string
) {
  const apiPath = searchAPIUrl;
  const swrResult = useSWR<
    IHTTPError | (IArticle | ICategory | IGlossaryTerm | IPage)[]
  >(
    searchText?.length > 3
      ? apiPath +
          encodeURI(
            searchText +
              "&filter=" +
              searchFilter +
              "&location=" +
              location +
              "&distance=" +
              distance
          )
      : null,
    jsonFetcher
  );
  return { ...swrResult };
}

export function useSuggest(suggestText?: string) {
  const swrResult = useSWR<IHTTPError | ISuggestEntry[]>(
    suggestText ? suggestAPIUrl + encodeURI(suggestText) : null,
    url =>
      jsonFetcher<any>(url).then(
        response =>
          response.suggest.title[suggestText ? suggestText : "default"]
            .suggestions
      )
  );
  return { ...swrResult };
}
