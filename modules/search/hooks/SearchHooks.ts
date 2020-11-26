import useSWR from "swr";

export function useSearch(searchText: string, hookCall: string) {
  const fetcher = (url: any) => {
    return fetch(url)
      .then(response => response.json())
      .then(jsonResponse => jsonResponse);
  };
  const swrResult = useSWR(
    searchText?.length > 3 ? encodeURI(hookCall) : null,
    fetcher
  );
  return { ...swrResult };
}

export function useSuggest(typedText: string, hookCall: string) {
  const fetcher = (url: any) => {
    return fetch(url)
      .then(response => response.json())
      .then(jsonResponse => jsonResponse.terms.voll);
  };
  const swrResult = useSWR(
    typedText?.length > 0 ? encodeURI(hookCall) : null,
    fetcher
  );
  return { ...swrResult };
}
