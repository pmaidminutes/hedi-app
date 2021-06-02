import { sendFeedbacks } from "@/modules/feedback/client/request/sendFeedback";
import { FeedbackInput } from "@/modules/feedback/types";
import { Form } from "carbon-components-react";
import { FormEvent } from "react";

export const MultipleFeedback: React.FC<{
  lang: string;
  onSuccess?: () => void;
  onError?: () => void;
  onEmptyError?: () => void;
}> = ({ lang, onSuccess, onError, onEmptyError, children }) => {
  const onSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const entryGroups: { [key: string]: FeedbackInput } = {};
    // TODO if some items are succeeded before, do not send them again
    formData.forEach((value, key) => {
      // naming pattern: feedback-KEY-ELEMENT: feedback-search-label, feedback-search-body
      const nameParts = key.split("_");
      if (nameParts.length != 3 || nameParts[0] != "feedback") return;
      const [_, group, field] = nameParts;
      if (!entryGroups[group]) entryGroups[group] = {};
      (entryGroups[group] as any)[field] = value?.valueOf();
    });
    const entriesToSend: FeedbackInput[] = [];
    for (const key in entryGroups) {
      if (Object.prototype.hasOwnProperty.call(entryGroups, key)) {
        if (entryGroups[key].body) entriesToSend.push({ ...entryGroups[key] });
      }
    }
    if (entriesToSend.length) {
      sendFeedbacks(entriesToSend, lang)
        .then(resp => {
          if (resp && resp.length == entriesToSend.length) {
            for (let index = 0; index < resp.length; index++) {
              const itemResult = resp[index];
              if (itemResult.success) {
                // TODO handle item success
              } else {
                // TODO handle item error
              }
            }
            if (!resp.filter(respItem => !respItem.success).length) {
              if (onSuccess) onSuccess();
            } else {
              // TODO how to handle partially succeeded mutations
              if (onError) onError();
            }
          } else {
            if (onError) onError();
          }
        })
        .catch(err => {
          if (onError) onError();
        });
    } else {
      if (onEmptyError) onEmptyError();
    }
    return false;
  };

  return <Form onSubmit={onSubmitHandler}>{children}</Form>;
};
