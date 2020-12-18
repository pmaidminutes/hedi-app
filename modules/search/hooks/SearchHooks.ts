import { jsonFetcher } from "@/common/utils";
import useSWR from "swr";

export function useSearch(
  searchText: string,
  lang: string = "de",
  entityType?: string
) {
  const apiPath = "/api/" + lang + "/search/";

  const swrResult = useSWR<any>(
    searchText?.length > 3
      ? apiPath + encodeURI(searchText + "/" + entityType)
      : null,
    jsonFetcher
  );
  return { ...swrResult };
}

export function useSuggest(suggestText?: string) {
  const splitWords = suggestText?.split(" ");
  const modifiedText = splitWords
    ? splitWords[splitWords.length - 1]
    : suggestText;

  const swrResult = useSWR(
    suggestText ? "/api/en/suggest/" + encodeURI(suggestText) : null,
    url => jsonFetcher<any>(url).then(response => response.terms.voll)
  );
  return { ...swrResult };
}
