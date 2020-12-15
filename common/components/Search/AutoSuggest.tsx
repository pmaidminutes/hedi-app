import { IsIHTTPError } from "@/common/errorHandling";
import { useSuggest } from "@/modules/search/hooks";

interface SuggestProps {
  hookCall: string;
  lang: string;
  textTyped: string;
  textSelected: (text: string) => void;
}
export const AutoSuggest: React.FunctionComponent<SuggestProps> = (
  props: SuggestProps
) => {
  const { data, error } = useSuggest(`${props.textTyped}`, `${props.hookCall}`);
  if (error) {
    //throw new Error(error);
    console.log("err");
  }
  const suggestionSelected = (value: string) => {
    props.textSelected(value);
  };
  return (
    <>
      {
        //TODO to remove style after Kathi provides styles
      }
      <ul
        style={{
          border: "2px",
          position: "absolute",
          backgroundColor: "lightgray",
          zIndex: 9999,
          marginTop: "-1.5rem"
        }}
        role="listbox"
        id="suggestion-list">
        {data && !IsIHTTPError(data)
          ? data.map((suggestedResult: string) =>
              typeof suggestedResult === "string" ? (
                <li
                  key={suggestedResult}
                  onClick={e => suggestionSelected(suggestedResult)}>
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
