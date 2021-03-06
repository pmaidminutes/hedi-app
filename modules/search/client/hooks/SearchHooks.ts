import { IErrorResponse } from "@/modules/common/error";
import { jsonFetcher } from "@/modules/common/utils";
import { IArticle } from "@/modules/editorial/article/types";
import { ICategory } from "@/modules/editorial/category/types";
import { IGlossaryTerm } from "@/modules/editorial/glossary/types";
import { IPage } from "@/modules/page/types";
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
    IErrorResponse | (IArticle | ICategory | IGlossaryTerm | IPage)[]
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
              distance +
              "&lang=" +
              lang
          )
      : null,
    jsonFetcher
  );
  return { ...swrResult };
}

export function useSuggest(suggestText?: string) {
  const swrResult = useSWR<IErrorResponse | ISuggestEntry[]>(
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
