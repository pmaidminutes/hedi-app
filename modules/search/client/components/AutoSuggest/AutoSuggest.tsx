import { useState } from "react";
import { IsIErrorResponse } from "@/modules/common/error";
import { HTMLWithNextImage } from "@/modules/react/html";
import { ISuggestEntry } from "../../../types";
import { useSuggest } from "../../hooks";
import { UnorderedList, ListItem } from "carbon-components-react";
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
      <UnorderedList role="listbox" id="suggestion-list">
        {data && !IsIErrorResponse(data)
          ? data.map((suggestedResult: ISuggestEntry, index: any) => (
              <ListItem
                key={index}
                onClick={e => handleSuggestSelected(suggestedResult.term)}>
                <HTMLWithNextImage data={suggestedResult.term} />
              </ListItem>
            ))
          : null}
      </UnorderedList>
    </>
  );
};
