import { Search } from "carbon-components-react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { AutoSuggest } from "./AutoSuggest";
interface SearchInputProps {
  inputText: (text: string) => void;
  textTyped: string;
}
export const SearchInput: React.FunctionComponent<SearchInputProps> = (
  props: SearchInputProps
) => {
  const [searchValue, setSearchValue] = useState(
    typeof props.textTyped === undefined ? "" : props.textTyped
  );
  const hookSuggestCall = `/api/en/suggest/${searchValue.trim()}`;
  const router = useRouter();
  const { locale } = router;

  const lang = locale;
  console.log("lang=>", lang);
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
        style={{ position: "relative", alignItems: "center" }}
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
