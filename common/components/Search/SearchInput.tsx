import { Search } from "carbon-components-react";
import React, { useState } from "react";
import { AutoSuggest } from "./AutoSuggest";
interface SearchInputProps {
  inputText: (text: string) => void;
  textTyped: string;
  size: "sm" | "xl";
  className?: string;
  id: string;
}
export const SearchInput: React.FunctionComponent<SearchInputProps> = (
  props: SearchInputProps
) => {
  const [searchValue, setSearchValue] = useState(
    typeof props.textTyped === undefined ? "" : props.textTyped
  );
  // console.log("lang=>", lang);
  // type ahead text or suggested text on typing in search box
  const handleSuggest = (textValue: string) => {
    // console.log(textValue + "-->text");
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
        size={props.size}
        id={props.id}
        placeHolderText="Search"
        autoComplete="off"
        value={searchValue}
        onChange={handleSearch}
        type="text"
        labelText=""
        className={props.className}
      />

      {
        //TODO to change the lang value
      }
      <AutoSuggest
        textTyped={searchValue}
        textSelected={text => handleSuggest(text)}
      />
    </>
  );
};
