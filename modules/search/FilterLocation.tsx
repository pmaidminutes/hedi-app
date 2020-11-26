import React, { useState } from "react";
import { Search, Button } from "carbon-components-react";
import { Add16 } from "@carbon/icons-react";

//TODO This file is not used at the moment
export const FilterLocation = (props: any) => {
  const [searchLocation, setSearchLocation] = useState("");

  const handleFilterInputChanges = (e: any) => {
    setSearchLocation(e.target.value);
  };

  const filterFunction = (e: any) => {
    e.preventDefault();
    props.FilterLocation(searchLocation);
    resetFilterField();
  };
  const resetFilterField = () => {
    setSearchLocation("");
  };

  return (
    <form>
      <Button kind="tertiary" renderIcon={Add16} onClick={filterFunction}>
        Filter
      </Button>

      <Search
        id="search-1"
        placeHolderText="Enter Location"
        value={searchLocation}
        onChange={handleFilterInputChanges}
        type="text"
        labelText="test"
      />
    </form>
  );
};
