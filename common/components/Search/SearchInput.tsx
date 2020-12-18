import { Search, SearchProps } from "carbon-components-react";
import { useEffect, useState } from "react";
import { AutoSuggest } from "./AutoSuggest";

interface SearchInputProps extends Partial<SearchProps> {
  onQueryChanged: (text: string) => void;
  query?: string;
}
export const SearchInput: React.FunctionComponent<SearchInputProps> = ({
  onQueryChanged,
  query,
  ...searchProps
}) => {
  const queryText = query ?? "";
  const [searchQuery, setSearchQuery] = useState(queryText);
  useEffect(() => {
    if (queryText) setSearchQuery(queryText);
  }, [queryText]);

  const [suggestQuery, setSuggestQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSuggestQuery(query);
    setSearchQuery(query);
    onQueryChanged(query);
  };

  const handleSuggestSelected = (text: string) => {
    setSearchQuery(text);
    setSuggestQuery("");
    onQueryChanged(text);
  };

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

      {
        //TODO to change the lang value
      }
      <AutoSuggest
        query={suggestQuery}
        suggestionSelected={handleSuggestSelected}
      />
    </>
  );
};
