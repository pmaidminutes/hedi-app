import { ToastNotification, Button } from "@/modules/components";
import {
  ToastNotification as IToastNotification,
  Button as IButton,
} from "@/modules/model/components";

export interface IFeedbackSubmitProps {
  errorNotification: IToastNotification | undefined;
  successNotification: IToastNotification | undefined;
  submitButton: IButton | undefined;
  errorMessage?: string | null;
  successMessage?: string | null;
}

export const FeedbackSubmit = ({
  errorNotification,
  successNotification,
  submitButton,
  errorMessage,
  successMessage,
}: IFeedbackSubmitProps) => {
  return (
    <div className="hedi--feedback-submit">
      {errorMessage && errorNotification && (
        <ToastNotification
          {...errorNotification}
          subtitle={errorMessage}
          lowContrast
        />
      )}
      {successMessage && successNotification && (
        <ToastNotification
          {...successNotification}
          subtitle={successMessage}
          lowContrast
        />
      )}
      {submitButton && <Button type="submit" size="field" {...submitButton} />}
    </div>
  );
};
