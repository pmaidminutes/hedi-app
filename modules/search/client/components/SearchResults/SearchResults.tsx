import React from "react";
import { Row, Column } from "carbon-components-react";
import { Label, InlineNotification } from "@/modules/components";
import { useSearchResults, ISearchResultProps } from "./useSearchResults";
import { ArticleEntry } from "@/modules/editorial/article/client/components";
import { IArticleEntry } from "@/modules/editorial/article/types";
import { GlossaryTermEntry } from "@/modules/editorial/glossary/client/components";
import { IGlossaryTerm } from "@/modules/editorial/glossary/types";
import { CategoryEntry } from "@/modules/editorial/category/client/components";
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
                <ArticleEntry
                  entryType="normal"
                  {...(result as IArticleEntry)}
                  key={result.label + index}
                />
              );
            case "GlossaryTerm":
              return (
                <GlossaryTermEntry
                  glossaryTerm={result as IGlossaryTerm}
                  key={result.route + index}
                />
              );
            // case "Category":
            //   categoryBlocks.push(
            //     <Column>
            //       <CategoryEntry category={result} key={result.route + index} />
            //     </Column>
            //   );
          }
        })}
      {/* <Row>
        {categoryBlocks?.map((categoryBlock: JSX.Element) => {
          return categoryBlock;
        })}
      </Row> */}
    </>
  );
};
