import { useState } from "react";
import { IsIHTTPError } from "@/common/errorHandling";
import { HTMLWithNextImage } from "@/modules/react/html";
import { ISuggestEntry } from "../../types";
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

  const stripHtml = (taggedText: string): string => {
    let divNode = document.createElement("DIV");
    divNode.innerHTML = taggedText;
    return divNode.textContent || divNode.innerText || "";
  };
  const handleSuggestSelected = (text: string) => {
    const plainText = stripHtml(text);
    setSelectedSuggestion(plainText);
    props.onSuggestSelect(plainText);
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
          ? data.map((suggestedResult: ISuggestEntry, index) => (
              <li
                style={{ padding: "5px" }}
                key={index}
                onClick={e => handleSuggestSelected(suggestedResult.term)}>
                <HTMLWithNextImage data={suggestedResult.term} />
              </li>
            ))
          : null}
      </ul>
    </>
  );
};
