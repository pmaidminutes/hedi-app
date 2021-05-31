import { TextInput, TextArea } from "carbon-components-react";
import { IUIElementTexts } from "@/modules/model";
import { getTextInputProps, getUIElement } from "@/modules/common/utils";

export interface IFeedbackEntryProps {
  elements: IUIElementTexts[];
  label: string;
  showTitle?: boolean;
  hideLegends?: boolean;
}

export const FeedbackEntry = ({
  elements,
  label,
  showTitle,
  hideLegends,
}: IFeedbackEntryProps) => {
  const titleInput = getTextInputProps("title", elements);

  return (
    <>
      {showTitle ? (
        <TextInput
          name={`feedback-${label}-label`}
          value={label}
          {...titleInput}
        />
      ) : (
        <input type="hidden" name={`feedback-${label}-label`} value={label} />
      )}
      <TextArea
        id="body"
        name={`feedback-${label}-body`}
        labelText={hideLegends ? "" : getUIElement("body")?.value || "Body"}
        placeholder={getUIElement("body")?.placeholder}
        helperText={getUIElement("body")?.help}
      />
    </>
  );
};
