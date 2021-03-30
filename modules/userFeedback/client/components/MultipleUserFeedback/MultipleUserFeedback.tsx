import { sendUserFeedbacks } from "@/modules/userFeedback/request/sendUserFeedback";
import { UserFeedbackInput } from "@/modules/userFeedback/types";
import { Form } from "carbon-components-react";
import { FormEvent } from "react";
import { clientInformationCollector } from "../../helper/ClientInformationCollector";

export const MultipleUserFeedback: React.FC<{
  lang: string;
  onSuccess?: () => void;
  onError?: () => void;
  onEmptyError?: () => void;
}> = ({ lang, onSuccess, onError, onEmptyError, children }) => {
  const onSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const metadata = clientInformationCollector();
    const entryGroups: { [key: string]: UserFeedbackInput } = {};
    // TODO if some items are succeeded before, do not send them again
    formData.forEach((value, key) => {
      // naming pattern: userfeedback-KEY-ELEMENT: userfeedback-search-label, userfeedback-search-body
      const nameParts = key.split("-");
      if (nameParts.length != 3 || nameParts[0] != "userfeedback") return;
      const [_, group, field] = nameParts;
      if (!entryGroups[group]) entryGroups[group] = {};
      (entryGroups[group] as any)[field] = value?.valueOf();
    });
    const entriesToSend: UserFeedbackInput[] = [];
    for (const key in entryGroups) {
      if (Object.prototype.hasOwnProperty.call(entryGroups, key)) {
        if (entryGroups[key].body)
          entriesToSend.push({ metadata, ...entryGroups[key] });
      }
    }
    if (entriesToSend.length) {
      sendUserFeedbacks(entriesToSend, lang)
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
