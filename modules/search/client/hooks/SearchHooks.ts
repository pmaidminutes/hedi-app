import { IHTTPError } from "@/modules/common/error";
import { jsonFetcher } from "@/modules/common/utils";
import { IArticle } from "@/modules/editorial/article/types";
import { ICategory } from "@/modules/editorial/category/types";
import { IGlossaryTerm } from "@/modules/editorial/glossary/types/glossary";
import useSWR from "swr";
import { ISuggestEntry } from "../../types";

export function useSearch(
  searchText: string,
  lang: string = "de",
  location: string,
  distance: string,
  searchFilter?: string
) {
  const apiPath = "/api/" + lang + "/search/";
  //TODO empty filter criterias doesnt recognize the api path yet, so given with temporary fix for now
  const pathFilter = searchFilter !== "" ? searchFilter : undefined;
  const swrResult = useSWR<
    IHTTPError | (IArticle | ICategory | IGlossaryTerm)[]
  >(
    searchText?.length > 3
      ? apiPath +
          encodeURI(
            searchText + "/" + pathFilter + "/" + location + "/" + distance
          )
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
