import { TextInput, TextArea } from "carbon-components-react";
import { IUIElementTexts } from "@/modules/model";
import { getTextInputProps, tryGet } from "@/modules/common/utils";

export interface IUserFeedbackEntryProps {
  elements: IUIElementTexts[];
  label: string;
  showTitle?: boolean;
}

export const UserFeedbackEntry = ({
  elements,
  label,
  showTitle,
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
        labelText={showTitle ? tryGet("body")?.value || "Body" : label}
        placeholder={tryGet("body")?.placeholder}
        helperText={tryGet("body")?.help}
      />
    </>
  );
};
