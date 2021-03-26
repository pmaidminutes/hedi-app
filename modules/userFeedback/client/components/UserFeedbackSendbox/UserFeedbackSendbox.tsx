import { tryGet } from "@/modules/common/utils";
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
          title={tryGet("error_message", elements)?.value || "Error"}
          subtitle={errorMessage}
        />
      )}
      {successMessage && (
        <InlineNotification
          kind="success"
          title={tryGet("success_message", elements)?.value || "Success"}
          subtitle={successMessage}
        />
      )}
      <Button type="submit" size="field">
        {tryGet("submit", elements)?.value || "Submit"}
      </Button>
    </div>
  );
};
