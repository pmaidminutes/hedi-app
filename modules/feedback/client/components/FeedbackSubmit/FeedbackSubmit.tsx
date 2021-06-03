import { ToastNotification, Button } from "@/modules/components";
import {
  Component,
  findButtonInstance,
  findToastNotificationInstance,
} from "@/modules/model/components";

export interface IFeedbackSubmitProps {
  components: Component[];
  errorMessage?: string | null;
  successMessage?: string | null;
}

export const FeedbackSubmit = ({
  components,
  errorMessage,
  successMessage,
}: IFeedbackSubmitProps) => {
  const errorMessageNotification = findToastNotificationInstance(
    components,
    "error_message"
  );
  const successMessageNotification = findToastNotificationInstance(
    components,
    "success_message"
  );
  const submitButton = findButtonInstance(components, "submit");

  return (
    <div className="hedi--feedback-submit">
      {errorMessage && errorMessageNotification && (
        <ToastNotification
          {...errorMessageNotification}
          subtitle={errorMessage}
          lowContrast
        />
      )}
      {successMessage && successMessageNotification && (
        <ToastNotification
          {...successMessageNotification}
          subtitle={successMessage}
          lowContrast
        />
      )}
      {submitButton && <Button type="submit" size="field" {...submitButton} />}
    </div>
  );
};
