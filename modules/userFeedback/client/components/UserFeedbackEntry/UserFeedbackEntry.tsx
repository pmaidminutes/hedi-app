import { TextInput, TextArea } from "carbon-components-react";
import { IUIElementTexts } from "@/modules/model";
import { getTextInputProps, tryGet } from "@/modules/common/utils";

export interface IUserFeedbackEntryProps {
  elements: IUIElementTexts[];
  label: string;
  showTitle?: boolean;
  hideLegends?: boolean;
}

export const UserFeedbackEntry = ({
  elements,
  label,
  showTitle,
  hideLegends,
}: IUserFeedbackEntryProps) => {
  const titleInput = getTextInputProps("title", elements);

  return (
    <>
      {showTitle ? (
        <TextInput
          name={`userfeedback-${label}-label`}
          value={label}
          {...titleInput}
        />
      ) : (
        <input
          type="hidden"
          name={`userfeedback-${label}-label`}
          value={label}
        />
      )}
      <TextArea
        id="body"
        name={`userfeedback-${label}-body`}
        labelText={hideLegends ? "" : tryGet("body")?.value || "Body"}
        placeholder={tryGet("body")?.placeholder}
        helperText={tryGet("body")?.help}
      />
    </>
  );
};
