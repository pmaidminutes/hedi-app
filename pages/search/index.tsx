/**
 * Search Root
 *
 * for language switching see ../index.tsx
 */

import { HediHeader } from "@/common/components";
import { ResultContent, SearchInput } from "@/common/components/Search";
import { IsIHTTPError } from "@/common/errorHandling";
import { useSearch } from "@/modules/search/hooks";
import { IContentEntry } from "@/modules/search/types";
import {
  Breadcrumb,
  Button,
  DatePicker,
  DatePickerInput,
  Dropdown,
  Loading,
} from "carbon-components-react";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
//TODO sample filter features, will be removed
const items = [
  {
    id: "user",
    label: "Midwife",
  },
  {
    id: "node",
    label: "Content",
  },
];

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
  } = useRouter();
  const router = useRouter();
  console.log(router.query, "query");

  const [entityId, setEntityId] = useState();
  const [searchText, setSearchText] = useState(`${searchTexts ?? ""}`);
  const [shouldFetch, setShouldFetch] = useState(false);
  //TODO temporary feature
  let errorMessage: string = "";

  const handleSearch = (e: any) => {
    setShouldFetch(true);
  };
  const handleEntityChanges = (e: any) => {
    setEntityId(e.selectedItem.id);
  };
  const hookCall = `/api/${props.lang}/search/${searchText}/${entityId}`;
  /*   if(`${query?.searchText}`?.length>3)
  {
    setSearchText(`${query.searchText}`);
    handleSearch;
  } */
  const { data, error } = useSearch(searchText, hookCall);
  if (error) {
    console.log("for now error");
    errorMessage = "No search Results";
  } else {
    loading = false;
  }

  return (
    <div>
      <HediHeader pageTitle={"Search"} translations={[]} />

      <Breadcrumb />
      <SearchInput inputText={e => setSearchText(e)} textTyped={searchText} />

      <Button kind="tertiary" onClick={handleSearch}>
        {"Search"}
      </Button>

      <Dropdown
        ariaLabel="Dropdown"
        id="entityId"
        onChange={() => handleEntityChanges}
        items={items}
        label="Select your search"
        titleText="Content/Midwife"
      />
      <DatePicker dateFormat="d/m/Y" datePickerType="single">
        <DatePickerInput
          id="date-picker-default-id"
          placeholder="dd/mm/yyyy"
          labelText="Due date"
          type="text"
        />
      </DatePicker>

      <div id="main-content">
        {
          //TODO should check for  empty array - even if there is no result will get loading overlay
          //data
        }
        {loading && !data ? (
          <Loading withOverlay={true} className={"some-class"} />
        ) : error || IsIHTTPError(data) ? (
          <div className="errorMessage">{data?.text || errorMessage}</div>
        ) : (
          <div>
            {!IsIHTTPError(data) &&
              data?.map((entity: IContentEntry, index: any) =>
                entity.contentId === "entity:user" ? (
                  <div>
                    {
                      //TODO user display is not currently shown here
                    }
                    <ResultContent
                      key={index}
                      result={entity}
                      highlight={entity.highlightedContent}
                    />
                  </div>
                ) : (
                  <div>
                    <ResultContent
                      result={entity}
                      highlight={entity.highlightedContent}
                    />
                  </div>
                )
              )}
          </div>
        )}
      </div>
    </div>
  );
}
