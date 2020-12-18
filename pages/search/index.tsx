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
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";

export const getStaticProps: GetStaticProps<any> = async context => {
  return { props: { lang: context.locale ?? "de", searchText: "" } };
};
interface SearchProps {
  lang: string;
  searchText: string;
}

export default function searchPage(props: SearchProps) {
  let loading = true;
  const {
    pathname,
    query: { searchTexts },
    locale,
  } = useRouter();
  const router = useRouter();
  console.log(router.query, "query");

  const [entityType, setEntityType] = useState();
  const [searchText, setSearchText] = useState(`${searchTexts ?? ""}`);
  const [shouldFetch, setShouldFetch] = useState(false);
  //TODO temporary feature
  let errorMessage: string = "";

  const handleSearch = (e: any) => {
    setShouldFetch(true);
  };
  const handleEntityChanges = (e: any) => {
    setEntityType(e.selectedItem.id);
  };
  console.log("lang in props", `${props.lang}`);
  //const hookCall = `/api/${props.lang}/search/${searchText}/${entityType}`;

  const { data, error } = useSearch(searchText, locale, entityType);
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
            inputText={e => setSearchText(e)}
            textTyped={searchText}
          />
        </div>

        <h2>Filters</h2>

        <button
          className="bx--btn bx--btn--primary"
          onClick={handleSearch}
          type="button">
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
