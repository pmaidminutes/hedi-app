import { getUIElement } from "@/modules/common/utils";
import { IUIElementTexts } from "@/modules/model";
import { Button, InlineNotification } from "carbon-components-react";

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
  return (
    <div className="hedi--userfeedback-sendbox">
      {errorMessage && (
        <InlineNotification
          kind="error"
          title={getUIElement("error_message", elements)?.value || "Error"}
          subtitle={errorMessage}
          lowContrast
        />
      )}
      {successMessage && (
        <InlineNotification
          kind="success"
          title={getUIElement("success_message", elements)?.value || "Success"}
          subtitle={successMessage}
          lowContrast
        />
      )}
      <Button type="submit" size="field">
        {getUIElement("submit", elements)?.value || "Submit"}
      </Button>
    </div>
  );
};
