import { FormEvent, useEffect, useState } from "react";
import {
  Form,
  Button,
  InlineNotification,
  TextInput,
  TextArea,
} from "carbon-components-react";
import { useTextInput } from "@/modules/react/hooks";
import { IUserFeedbackError } from "@/modules/userFeedback/types/IUserFeedbackError";
import { sendUserFeedback } from "@/modules/userFeedback/query/sendUserFeedback";
import { clientInformationCollector } from "../../helper/ClientInformationCollector";
import { IUIElementTexts } from "@/modules/model";

export const UserFeedbackForm = ({ labels }: { labels: IUIElementTexts[] }) => {
  const [label, setLabel] = useTextInput();
  const [body, setBody] = useTextInput();
  const [isSucceed, setIsSucceed] = useState(false);
  const [error, setError] = useState({} as IUserFeedbackError);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendUserFeedback({
      label,
      body,
      metadata: clientInformationCollector(),
    })
      .then(resp => {
        if (resp?.success) {
          setIsSucceed(true);
        } else {
          setError({
            generic: resp?.errors?.generic,
            label: resp?.errors?.label || "",
            body: resp?.errors?.body || "",
          });
        }
      })
      .catch(err => {
        setError({ generic: err, body: "", label: "" });
      });
  };

  const getLabel = (key: string) => {
    return labels?.find(item => item.identifier == key);
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error?.generic && (
        <InlineNotification
          kind="error"
          title={getLabel("error")?.value || "Error"}
          subtitle={error.generic}
        />
      )}
      {isSucceed && (
        <InlineNotification
          kind="success"
          title={getLabel("success")?.value || "Success"}
          subtitle={getLabel("success")?.help}
        />
      )}
      <TextInput
        id="label"
        labelText={getLabel("title")?.value || "Title"}
        placeholder={getLabel("title")?.placeholder}
        onChange={setLabel}
        invalid={!!error?.label}
        invalidText={error?.label}
      />
      <TextArea
        id="body"
        labelText={getLabel("body")?.value || "Body"}
        placeholder={getLabel("body")?.placeholder}
        required
        onChange={setBody}
        invalid={!!error?.body}
        invalidText={error?.body}
      />

      <Button type="submit" size="field">
        {getLabel("submit")?.value || "Submit"}
      </Button>
    </Form>
  );
};
