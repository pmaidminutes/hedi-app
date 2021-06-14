import { Map } from "@/modules/map/client/components/Map";
import { SearchInput } from "@/modules/search/client/components";
import { Seperator } from "@/modules/common/components";
import {
  Column,
  Grid,
  Loading,
  Row,
  Slider,
  TextInput,
} from "carbon-components-react";
import React from "react";
import { useSearchView, ISearchProps } from "./useSearchView";
import { Filter } from "../Filter";
import { SearchResults } from "../SearchResults";

export const SearchView = (props: ISearchProps): JSX.Element => {
  const {
    handleLocation,
    handleQueryChanged,
    initialQueryText,
    loading,
    data,
    errorMessage,
    locale,
    defaultLocale,
    locations,
    handleDistanceChange,
    handleFilter,
    filterTypes,
    resultsHeadline,
  } = useSearchView(props);

  return (
    <Grid>
      <Row>
        <Column>
          <SearchInput
            id={"search-results"}
            size={"xl"}
            onQueryChanged={e => handleQueryChanged(e)}
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
          onChange={({ value }) => handleDistanceChange(value)}
        />
      </div>
      <Filter types={filterTypes} handleFilter={handleFilter} />
      <Seperator />

      <div>{/* iterate article component */}</div>
      {
        //TODO should check for  empty array - even if there is no result will get loading overlay
        //data
      }
      {loading && !data ? (
        <Loading withOverlay={true} className={"some-class"} />
      ) : (
        <div>
          <SearchResults results={data} headline={resultsHeadline} />
          {/* {locations?.length > 0 ? (
            <Map currentLocation={locations[0]} locations={locations} />
          ) : (
            ""
          )} */}
        </div>
      )}
    </Grid>
  );
};
