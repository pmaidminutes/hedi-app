import React from "react";
import { Row, Column } from "carbon-components-react";
import { Label, InlineNotification } from "@/modules/components";
import { useSearchResults, ISearchResultProps } from "./useSearchResults";
import { ArticleEntry } from "@/modules/editorial/article/client/components";
import { IArticleEntry } from "@/modules/editorial/article/types";
import { GlossaryTerm } from "@/modules/editorial/glossary/client/components";
import { IGlossaryTerm } from "@/modules/editorial/glossary/types";
import { ProfileEntry } from "@/modules/profile/client/components";
import { CategoryEntry } from "@/modules/editorial/category/client/components";
import { transformSearchComponents } from ".";
export const SearchResults = (props: ISearchResultProps) => {
  const { results, hasError } = useSearchResults(props);
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
                <ArticleEntry
                  article={result as IArticleEntry}
                  key={result.label + index}
                />
              );
            case "GlossaryTerm":
              return (
                <GlossaryTerm
                  glossaryTerm={result as IGlossaryTerm}
                  isSelected={true}
                  key={result.route + index}
                />
              );
            case "Category":
              return (
                <CategoryEntry category={result} key={result.route + index} />
              );
          }
        })}
    </>
  );
};

//TODO if there will be too many locations due to state changes..
//TODO for now there is no latitude and longitude in the profiles
// if (entry.lat && entry.long)
//   locations.push({
//     lat: entry.lat,
//     long: entry.long,
//     displayName: entry.displayName,
//   } as Location);
