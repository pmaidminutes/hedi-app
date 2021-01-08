import { IsIHTTPError } from "@/common/errorHandling";
import { useState } from "react";
import { useSuggest } from "../hooks";

interface SuggestProps {
  query: string;
  onSuggestSelect: (text: string) => void;
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

  const handleSuggestSelected = (text: string) => {
    setSelectedSuggestion(text);
    props.onSuggestSelect(text);
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
          ? data.map((suggestedResult: string) =>
              typeof suggestedResult === "string" ? (
                <li
                  style={{ padding: "5px" }}
                  key={suggestedResult}
                  onClick={e => handleSuggestSelected(suggestedResult)}>
                  {suggestedResult}
                </li>
              ) : (
                ""
              )
            )
          : ""}
      </ul>
    </>
  );
};
