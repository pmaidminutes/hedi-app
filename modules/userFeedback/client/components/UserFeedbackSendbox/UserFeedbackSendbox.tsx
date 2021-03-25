import { IUIElementTexts } from "@/modules/model";
import { Button } from "carbon-components-react";

export interface IUserFeedbackSendboxProps {
  elements: IUIElementTexts[];
  errorMessage?: string | null;
  successMessage?: string | null;
}

export const UserFeedbackSendbox = ({
  elements,
  errorMessage,
  successMessage,
}: IUserFeedbackSendboxProps) => {
  const getUIElement = (identifier: string) => {
    return elements.find(item => item.identifier === identifier);
  };

  return (
    <div className="hedi--userfeedback-sendbox">
      {errorMessage && (
        <div className="hedi--userfeedback-error">{errorMessage}</div>
      )}
      {successMessage && (
        <div className="hedi--userfeedback-success">{successMessage}</div>
      )}
      <Button type="submit" size="field">
        {getUIElement("submit")?.value || "Submit"}
      </Button>
    </div>
  );
};
