import React from "react";

import { Label, InlineNotification } from "@/modules/components";
import { useSearchResults, ISearchResultProps } from "./useSearchResults";
import { ArticleTeaserEntry } from "@/modules/editorial/article/client/components";
import { IArticleEntry } from "@/modules/editorial/article/types";
import { GlossaryTermClickable } from "@/modules/editorial/glossary/client/components";
import { IGlossaryTerm } from "@/modules/editorial/glossary/types";
import { transformSearchComponents } from ".";
export const SearchResults = (props: ISearchResultProps) => {
  const { results, hasError } = useSearchResults(props);
  const categoryBlocks: JSX.Element[] = [];
  const { resultsHeadline, errorToastMessage } = transformSearchComponents(
    props
  );
  if (hasError)
    return (
      <>
        {" "}
        {errorToastMessage && (
          <InlineNotification {...errorToastMessage} />
        )}{" "}
      </>
    );

  return (
    <>
      {results && resultsHeadline && <Label {...resultsHeadline} />}
      {/* TODO typing */}
      {results &&
        results.map((result: any, index: number) => {
          if (!result) return null;
          switch (result.type) {
            case "Article":
              return (
                <ArticleTeaserEntry
                  {...(result as IArticleEntry)}
                  key={result.label + index}
                />
              );
            case "GlossaryTerm":
              return (
                <GlossaryTermClickable
                  glossaryTerm={result as IGlossaryTerm}
                  key={result.route + index}
                />
              );
          }
        })}
    </>
  );
};
