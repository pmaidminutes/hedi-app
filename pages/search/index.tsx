/**
 * Search Root
 *
 * for language switching see ../index.tsx
 */

import Head from "next/head";
import React, { useState } from "react";
import {
  Loading,
  DatePicker,
  DatePickerInput,
  Dropdown,
  Button,
} from "carbon-components-react";
import { Add16, Search20 } from "@carbon/icons-react";
import { ILanguageKey, ILanguageParam } from "@/common/types";
import { GetStaticProps } from "next";
import { ResultContent, SearchInput } from "@/common/components/Search";
import { useSearch } from "@/modules/search/hooks";
import { IsIHTTPError } from "@/common/errorHandling";
import { IContentEntry } from "@/modules/search/types";
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

export const getStaticProps: GetStaticProps<ILanguageKey> = async context => {
  return { props: { lang: context.locale ?? "de" } };
};

export default function searchPage(props: ILanguageKey) {
  let loading = true;
  const [entityId, setEntityId] = useState();
  const [searchText, setSearchText] = useState("");
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
  const { data, error } = useSearch(searchText, hookCall);
  if (error) {
    console.log("for now error");
    errorMessage = "No search Results";
  } else {
    loading = false;
  }

  return (
    <div>
      <Head>
        <title>HEDI App Search</title>
      </Head>
      <main>
        <h1>HEDI App Search</h1>
        <p> </p>

        <div style={{ display: "flex" }}>
          <SearchInput inputText={e => setSearchText(e)} />
          <Search20 id="se-id" />
        </div>

        <Button kind="tertiary" renderIcon={Add16} onClick={handleSearch}>
          {"Filter"}
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
          <div>
            <div>
              <div>
                {
                  //TODO should check for  empty array - even if there is no result will get loading overlay
                  //data
                }
                {loading && !data ? (
                  <Loading withOverlay={true} className={"some-class"} />
                ) : error || IsIHTTPError(data) ? (
                  <div className="errorMessage">
                    {data?.text || errorMessage}
                  </div>
                ) : (
                  <div>
                    {!IsIHTTPError(data) &&
                      data?.map((entity: IContentEntry) =>
                        entity.contentId === "entity:user" ? (
                          <div>
                            {
                              //TODO user display is not currently shown here
                            }
                            <ResultContent
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
          </div>{" "}
        </div>
      </main>
    </div>
  );
}
