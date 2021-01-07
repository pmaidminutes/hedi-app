import { IsIHTTPError } from "@/common/errorHandling";
import { HTMLWithNextImage } from "@/common/html";
import { useSuggest } from "@/modules/search/hooks";
import { useState } from "react";

interface SuggestProps {
  query: string;
  suggestionSelected: (text: string) => void;
}
export const AutoSuggest: React.FunctionComponent<SuggestProps> = (
  props: SuggestProps
) => {
  const [selectedSuggestion, setSelectedSuggestion] = useState("");

  const { data, error } = useSuggest(
    props.query !== selectedSuggestion ? props.query : undefined
  );
  if (error) {
    //throw new Error(error);
    console.log("err");
  }

  const suggestItemSelected = (text: string) => {
    setSelectedSuggestion(text);
    props.suggestionSelected(text);
  };
  return (
    <>
      {
        //TODO to remove style after Kathi provides styles
      }
      <ul
        className="hedi-auto-suggest"
        style={{
          border: "2px",
          position: "absolute",
          zIndex: 9999,
          width: "100%",
        }}
        role="listbox"
        id="suggestion-list">
        {data && !IsIHTTPError(data)
          ? data.map(suggestedResult => (
              <li
                style={{ padding: "5px" }}
                key={suggestedResult.term}
                onClick={e => suggestItemSelected(suggestedResult.term)}>
                <HTMLWithNextImage data={suggestedResult.term} />
              </li>
            ))
          : ""}
      </ul>
    </>
  );
};
