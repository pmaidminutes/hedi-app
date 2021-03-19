import { TextInput, TextArea } from "carbon-components-react";
import { IUIElementTexts } from "@/modules/model";
import { getTextInputProps } from "@/modules/common/utils";

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
  const getUIElement = (identifier: string) => {
    return elements.find(item => item.identifier === identifier);
  };
  const titleInput = getTextInputProps("title", elements);

  return (
    <>
      {showTitle ? (
        <TextInput
          name={`userfeedback-${label}-label`}
          // invalid={!!error?.label}
          // invalidText={error?.label}
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
        labelText={showTitle ? getUIElement("body")?.value || "Body" : label}
        placeholder={getUIElement("body")?.placeholder}
        helperText={getUIElement("body")?.help}
        // onChange={setBody}
        // invalid={!!error?.body}
        // invalidText={error?.body}
      />
    </>
  );
};
