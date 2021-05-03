import { useAutoSuggest, ISuggestProps } from "./useAutoSuggest";
import { ISuggestEntry } from "../../../types";
import { HTMLWithNextImage } from "@/modules/react/html";
import { UnorderedList, ListItem } from "carbon-components-react";

export const AutoSuggest: React.FunctionComponent<ISuggestProps> = (
  props: ISuggestProps
) => {
  const { data, handleSuggestSelected } = useAutoSuggest(props);

  return (
    <>
      <UnorderedList role="listbox" id="suggestion-list">
        {data &&
          data.map((suggestedResult: ISuggestEntry, index: any) => (
            <ListItem
              key={index}
              onClick={() => handleSuggestSelected(suggestedResult.term)}>
              <HTMLWithNextImage data={suggestedResult.term} />
            </ListItem>
          ))}
      </UnorderedList>
    </>
  );
};
