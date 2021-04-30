import React from "react";
import { Checkbox, Button } from "carbon-components-react";
import { FilterReset16 } from "@carbon/icons-react";
import { useSearchFilter, ISearchFilterProps } from "./useSearchFilter";

export const Filter = (props: ISearchFilterProps) => {
  const { types, handleChange, resetFilter, activeFilters } = useSearchFilter(
    props
  );
  return (
    <div className="hedi--search__filter">
      <fieldset>
        {types.map((type, index) => (
          <Checkbox
            onChange={e => handleChange(e, type)}
            id={type}
            key={type + index}
            labelText={type}
            checked={activeFilters.includes(type)}></Checkbox>
        ))}
      </fieldset>
      <Button
        renderIcon={FilterReset16}
        // TODO description
        iconDescription="Filter zurücksetzen"
        hasIconOnly
        onClick={() => resetFilter()}
      />
    </div>
  );
};
