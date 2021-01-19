/**
 * Search Root
 *
 * for language switching see ../index.tsx
 */

import { IsIHTTPError } from "@/modules/common/error";
import { ArticleEntry } from "@/modules/editorial/article/client/components";
import { CategoryEntry } from "@/modules/editorial/category/client/components";
import { GlossaryTerm } from "@/modules/editorial/glossary/client/components";
import { SearchInput } from "@/modules/search/client/components";
import { useSearch } from "@/modules/search/client/hooks";
import { BreadCrumb, Header } from "@/modules/shell/components";
import { Loading } from "carbon-components-react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function searchPage() {
  let loading = true;

  const router = useRouter();
  const options = router.query?.options ?? "";
  const initialQueryText = `${options}`;

  const [queryText, setQueryText] = useState(initialQueryText);
  useEffect(() => {
    setQueryText(initialQueryText);
  }, [initialQueryText]);

  const locale = router.locale ?? "de";
  const defaultLocale = router.defaultLocale;
  // TODO implement filter options
  const [filter, setFilter] = useState(String);

  //TODO temporary feature
  let errorMessage: string = "";

  const { data, error } = useSearch(queryText, locale, filter);
  if (error) {
    console.log("for now error");
    errorMessage = "No search Results";
  } else if (IsIHTTPError(data)) {
    errorMessage = data.text;
  } else {
    loading = false;
  }

  return (
    <div>
      <Header label={"Search"} translations={[]} />

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

        <button
          className="bx--btn bx--btn--primary"
          type="button"
          onClick={e => setFilter("ss_type:article")}>
          articles
        </button>
        <button
          className="bx--btn bx--btn--primary"
          type="button"
          onClick={e => setFilter("ss_type:*_tmp")}>
          profiles
        </button>
        <button
          className="bx--btn bx--btn--primary"
          type="button"
          onClick={e => setFilter("ss_vid:categories")}>
          categories
        </button>
        <div className="hedi-separator"></div>
        <h2>Search results</h2>
        <div className="bx--tile-container">
          {/* iterate article component */}
        </div>
        {
          //TODO should check for  empty array - even if there is no result will get loading overlay
          //data
        }
        {loading && !data ? (
          <Loading withOverlay={true} className={"some-class"} />
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          <div className="bx--tile-container">
            {IsIHTTPError(data)
              ? []
              : data?.map((entry: any) => {
                  if (!entry) return null;
                  switch (entry.type) {
                    case "Article":
                      return (
                        <ArticleEntry
                          article={entry}
                          key={entry.route + locale}
                        />
                      );
                    case "Category":
                      return (
                        <CategoryEntry
                          category={entry}
                          key={entry.route + locale}
                        />
                      );
                    case "GlossaryTerm":
                      return (
                        <GlossaryTerm
                          glossaryTerm={entry}
                          isSelected={true}
                          translationLang={defaultLocale}
                          key={entry.route + locale}
                        />
                      );
                  }
                })}
          </div>
        )}
      </main>
    </div>
  );
}
