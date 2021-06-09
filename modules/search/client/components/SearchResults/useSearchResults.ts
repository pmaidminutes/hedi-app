import { useState, useEffect } from "react";
import { IErrorResponse, IsIErrorResponse } from "@/modules/common/error";
import { IArticle } from "@/modules/editorial/article/types";
import { ICategory } from "@/modules/editorial/category/types";
import { IGlossaryTerm } from "@/modules/editorial/glossary/types";
import { IPage } from "@/modules/page/types";

export type SearchResultTypes = IPage | IArticle | ICategory | IGlossaryTerm;

export interface ISearchResultProps {
  results: IErrorResponse | SearchResultTypes[] | null;
  headline?: string;
}

export function useSearchResults(props: ISearchResultProps) {
  const { results, headline } = props;
  const [searchResults, setSearchResults] = useState<
    SearchResultTypes[] | null
  >(null);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<IErrorResponse>();

  useEffect(() => {
    if (IsIErrorResponse(results)) {
      setHasError(true);
      setError(results);
      setSearchResults(null);
      return;
    }
    setHasError(false);
    if (results && results.length > 0) {
      setSearchResults(results);
      return;
    }
    setSearchResults(null);
  }, [results]);
  return {
    results: searchResults as SearchResultTypes[] | null,
    hasError,
    error,
    headline: headline ?? null,
  };
}
