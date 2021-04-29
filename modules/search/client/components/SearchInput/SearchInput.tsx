import { Search } from "carbon-components-react";
import { AutoSuggest } from "../AutoSuggest";
import { ISearchInputProps, useSearchInput } from "./useSearchInput";

export const SearchInput: React.FunctionComponent<ISearchInputProps> = props => {
  const {
    searchQuery,
    suggestQuery,
    handleSearch,
    handleSuggestSelected,
    ...searchProps
  } = useSearchInput(props);

  return (
    <>
      <Search
        data-search
        placeHolderText="Search"
        autoComplete="off"
        value={searchQuery}
        onChange={handleSearch}
        type="search"
        labelText=""
        {...searchProps}
      />

      <AutoSuggest
        query={suggestQuery}
        onSuggestSelect={handleSuggestSelected}
      />
    </>
  );
};
