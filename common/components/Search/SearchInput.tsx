import { Search } from "carbon-components-react";
import React, { useState } from "react";
import { AutoSuggest } from "./AutoSuggest";
interface SearchInputProps {
  inputText: (text: string) => void;
  // lang: string;
}

export const SearchInput: React.FunctionComponent<SearchInputProps> = (
  props: SearchInputProps
) => {
  const [searchValue, setSearchValue] = useState("");
  const hookSuggestCall = `/api/en/suggest/${searchValue}`;

  // type ahead text or suggested text on typing in search box
  const handleSuggest = (textValue: string) => {
    console.log(textValue + "-->text");
    setSearchValue(textValue);
    props.inputText(textValue);
  };

  const handleSearch = (text: any) => {
    setSearchValue(text.target.value);
    props.inputText(text.target.value);
  };

  return (
    <>
      <Search
        data-search
        light
        size="sm"
        id="search-text"
        placeHolderText="Search"
        autoComplete="off"
        value={searchValue}
        onChange={handleSearch}
        type="text"
        labelText=""
      />
      {
        //TODO to change the lang value
      }
      <AutoSuggest
        hookCall={hookSuggestCall}
        lang={"en"}
        textTyped={searchValue}
        textSelected={text => handleSuggest(text)}
      />
    </>
  );
};