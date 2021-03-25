import { IsIHTTPError } from "@/modules/common/error";
import { ArticleEntry } from "@/modules/editorial/article/client/components";
import { PageEntry } from "@/modules/editorial/page/client/components";
import { CategoryEntry } from "@/modules/editorial/category/client/components";
import { GlossaryTerm } from "@/modules/editorial/glossary/client/components";
import { MapClient } from "@/modules/map/client/components";
import { Location } from "@/modules/map/types";
import { ITyped, IUIText } from "@/modules/model";
import { ProfileEntry } from "@/modules/profile/client/components";
import { SearchInput } from "@/modules/search/client/components";
import { Seperator } from "@/modules/common/components";
import { useSearch } from "@/modules/search/client/hooks";
import {
  Column,
  Grid,
  Loading,
  Row,
  Slider,
  TextInput,
  Button,
  ToastNotification,
} from "carbon-components-react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { IAppPage } from "@/modules/common/types";

export const TrySearch = (content: ITyped): JSX.Element | null =>
  content.type === "Search" ? <Search content={content as IAppPage} /> : null;

interface ISearchProps {
  content: IAppPage;
}

export const Search = ({ content }: ISearchProps): JSX.Element => {
  let loading = true;

  const router = useRouter();

  let initialQueryText = "";
  const segments = router.query.segments;
  if (Array.isArray(segments) && segments.length > 1) {
    const path = [...segments];
    path.shift(); // discard 'search' or 'suche' etc
    initialQueryText = path.join(" ");
  }

  const [queryText, setQueryText] = useState(initialQueryText);
  useEffect(() => {
    setQueryText(initialQueryText);
  }, [initialQueryText]);

  const locale = router.locale ?? "de";
  const { defaultLocale } = router;
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
  const locations: Location[] = [];
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
    <Grid>
      <Row>
        <Column>
          <SearchInput
            id={"search-results"}
            size={"xl"}
            onQueryChanged={e => setQueryText(e.trim())}
            query={initialQueryText}
          />
        </Column>
      </Row>
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
      <Button kind="primary" onClick={e => handleFilter("articles")}>
        articles
      </Button>
      <Button kind="primary" onClick={e => handleFilter("profiles")}>
        profiles
      </Button>
      <Button kind="primary" onClick={e => handleFilter("categories")}>
        categories
      </Button>
      <Button kind="primary" onClick={e => handleFilter("articles")}>
        articles
      </Button>

      <Seperator />
      <h2>{content.elements.find(e => e.identifier === "results")?.value}</h2>
      <div>{/* iterate article component */}</div>
      {
        //TODO should check for  empty array - even if there is no result will get loading overlay
        //data
      }
      {loading && !data ? (
        <Loading withOverlay={true} className={"some-class"} />
      ) : errorMessage ? (
        <ToastNotification title="Error" kind="error">
          {errorMessage}
        </ToastNotification>
      ) : (
        <div>
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
                  case "Page":
                    return (
                      <PageEntry page={entry} key={entry.route + locale} />
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
                  case "Organisation":
                  case "Institution":
                    {
                      //TODO if there will be too many locations due to state changes..
                      locations.push({
                        lat: entry.lat,
                        long: entry.long,
                        displayName: entry.displayName,
                      } as Location);
                    }
                    return (
                      <ProfileEntry
                        {...entry} // HACK, just done to get it building, validate
                        key={entry.route + locale}
                      />
                    );
                }
              })}
          {locations?.length > 0 ? (
            <MapClient currentLocation={locations[0]} locations={locations} />
          ) : (
            ""
          )}
        </div>
      )}
    </Grid>
  );
};
