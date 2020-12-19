/**
 * Search Root
 *
 * for language switching see ../index.tsx
 */

import {
  ArticleEntry,
  BreadCrumb,
  CategoryEntry,
  GlossaryEntry,
  HediHeader,
} from "@/common/components";
import { SearchInput } from "@/common/components/Search";
import { IsIHTTPError } from "@/common/errorHandling";
import { useSearch } from "@/modules/search/hooks";
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
  const defaultLocale = router.defaultLocale;
  // TODO implement filter options
  const [filter, setFilter] = useState();

  //TODO temporary feature
  let errorMessage: string = "";

  const { data, error } = useSearch(queryText, locale, filter);
  const results = IsIHTTPError(data) ? [] : data ?? [];
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
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          <div className="bx--tile-container">
            {results.map((entry: any) => {
              if (!entry) return null;
              switch (entry.typeName) {
                case "Article":
                  return <ArticleEntry article={entry} />;
                case "Category":
                  return <CategoryEntry category={entry} />;
                case "GlossaryEntry":
                  return (
                    <GlossaryEntry
                      glossaryEntry={entry}
                      selected={true}
                      translationLang={defaultLocale}
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
