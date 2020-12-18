import useSWR from "swr";

export function useSearch(
  searchText: string,
  lang: string = "de",
  entityType?: string
) {
  const apiPath = "/api/" + lang + "/search/";
  const fetcher = (url: any) => {
    return fetch(url)
      .then(response => response.json())
      .then(jsonResponse => jsonResponse);
  };
  const swrResult = useSWR(
    searchText?.length > 3
      ? apiPath + encodeURI(searchText + "/" + entityType)
      : null,
    fetcher
  );
  return { ...swrResult };
}

export function useSuggest(suggestText?: string) {
  const fetcher = (url: any) => {
    return fetch(url)
      .then(response => response.json())
      .then(jsonResponse => jsonResponse.terms.voll);
  };
  const splitWords = suggestText?.split(" ");
  const modifiedText = splitWords
    ? splitWords[splitWords.length - 1]
    : suggestText;

  const swrResult = useSWR(
    suggestText ? "/api/en/suggest/" + encodeURI(suggestText) : null,
    fetcher
  );
  return { ...swrResult };
}
