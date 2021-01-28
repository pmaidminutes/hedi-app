/**
 * Search Root
 *
 * for language switching see ../index.tsx
 */

import { IsIHTTPError } from "@/modules/common/error";
import { ArticleEntry } from "@/modules/editorial/article/client/components";
import { CategoryEntry } from "@/modules/editorial/category/client/components";
import { GlossaryTerm } from "@/modules/editorial/glossary/client/components";
import { ProfileEntry } from "@/modules/profile/client/components";
import { SearchInput } from "@/modules/search/client/components";
import { useSearch } from "@/modules/search/client/hooks";
import { BreadCrumb, Header } from "@/modules/shell/components";
import { Loading, Slider, TextInput } from "carbon-components-react";
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
  // TODO implement other possible filter options
  const [filter, setFilter] = useState("");
  //TODO pick it up from env file for now 5kms around
  const [distance, setDistance] = useState("5");
  const [location, setLocation] = useState("");
  const handleFilter = function (selectedFilter: string) {
    filter
      ? setFilter(filter + " OR " + selectedFilter)
      : setFilter(selectedFilter);
  };
  const handleLocation = async function (typedLocation: string) {
    const typedAddress = typedLocation.replace(/\s/g, "+");
    setLocation(typedAddress);
  };
  //TODO not used at the moment
  const resetFilter = function () {
    setFilter("");
  };
  //TODO not used at the moment
  const removeFilter = function (removedFilter: string) {};
  //TODO temporary feature
  let errorMessage: string = "";

  const { data, error } = useSearch(
    queryText,
    locale,
    location,
    distance,
    filter
  );
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
        <div>
          {
            //TODO cannot have onchange need to use button to fetch location
            //or to find once the typing is finished
          }
          <TextInput
            helperText=" "
            id="location"
            invalidText="A valid value is required"
            labelText="Address line"
            placeholder="Enter address"
            onChange={e => handleLocation(e.target.value)}
            //value={location}
          />
          <Slider
            ariaLabelInput="Slide for distance"
            id="slider"
            labelText="Control distance"
            max={10}
            min={0}
            step={1}
            stepMultiplier={2}
            value={5}
            hideTextInput={true}
            onChange={({ value }) => setDistance(value.toString())}
          />
        </div>
        <button
          className="bx--btn bx--btn--primary"
          type="button"
          onClick={e => handleFilter("articles")}>
          articles
        </button>
        <button
          className="bx--btn bx--btn--primary"
          type="button"
          onClick={e => handleFilter("profiles")}>
          profiles
        </button>
        <button
          className="bx--btn bx--btn--primary"
          type="button"
          onClick={e => handleFilter("categories")}>
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
                  console.log(entry.type, "in frontend");
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
                    case "Caregiver":
                    case "Midwife":
                      return (
                        <ProfileEntry
                          profile={entry}
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
