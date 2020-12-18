/**
 * Search Root
 *
 * for language switching see ../index.tsx
 */

import { BreadCrumb, HediHeader } from "@/common/components";
import { ArticleBlock } from "@/common/components/Article/ArticleBlock";
import { SearchInput } from "@/common/components/Search";
import { IsIHTTPError } from "@/common/errorHandling";
import { useSearch } from "@/modules/search/hooks";
import { IContentEntry } from "@/modules/search/types";
import { Loading } from "carbon-components-react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function searchPage() {
  let loading = true;

  const router = useRouter();
  const options = router.query?.options ?? "";
  const initialQueryText = Array.isArray(options) ? options[0] : options;

  const [queryText, setQueryText] = useState(initialQueryText);
  useEffect(() => {
    setQueryText(initialQueryText);
  }, [initialQueryText]);

  const locale = router.locale ?? "de";

  // TODO implement filter options
  const [filter, setFilter] = useState();

  //TODO temporary feature
  let errorMessage: string = "";

  const { data, error } = useSearch(queryText, locale, filter);
  if (error) {
    console.log("for now error");
    errorMessage = "No search Results";
  } else {
    loading = false;
  }

  return (
    <div>
      <HediHeader pageTitle={"Search"} translations={[]} />

      <BreadCrumb />
      <main className="bx--grid">
        <div>
          <SearchInput
            className={"mb-l-xs"}
            id={"search-results"}
            size={"xl"}
            onQueryChanged={e => setQueryText(e.trim())}
            query={initialQueryText}
          />
        </div>

        <h2>Filters</h2>

        <button className="bx--btn bx--btn--primary" type="button">
          articles
        </button>
        <button className="bx--btn bx--btn--primary" type="button">
          profiles
        </button>
        <button className="bx--btn bx--btn--primary" type="button">
          categories
        </button>
        <div className="hedi-separator"></div>

        <div className="bx--tile-container">
          {/* iterate article component */}
        </div>
        {
          //TODO should check for  empty array - even if there is no result will get loading overlay
          //data
        }
        {loading && !data ? (
          <Loading withOverlay={true} className={"some-class"} />
        ) : error || IsIHTTPError(data) ? (
          <div className="errorMessage">{data?.text || errorMessage}</div>
        ) : (
          <div className="bx--tile-container">
            {!IsIHTTPError(data) &&
              data?.map((entity: IContentEntry, index: any) =>
                entity.ss_type === "article" ? (
                  <ArticleBlock
                    key={index}
                    result={entity}
                    highlight={entity.highlightedContent}
                  />
                ) : (
                  ""
                )
              )}
          </div>
        )}
      </main>
    </div>
  );
}
