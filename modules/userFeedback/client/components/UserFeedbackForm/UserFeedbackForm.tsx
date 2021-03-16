import { FormEvent, useState } from "react";
import {
  Form,
  Button,
  InlineNotification,
  TextInput,
  TextArea,
} from "carbon-components-react";
import { useTextInput } from "@/modules/react/hooks";
import { IUserFeedbackError } from "@/modules/userFeedback/types";
import { sendUserFeedback } from "@/modules/userFeedback/request";
import { clientInformationCollector } from "../../helper/ClientInformationCollector";
import { IUIElementTexts } from "@/modules/model";
import { getTextInputProps } from "@/modules/common/utils";

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

  const getUIElement = (key: string) => {
    return getTextInputProps(key, labels);
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error?.generic && (
        <InlineNotification
          kind="error"
          title={getUIElement("error")?.labelText || "Error"}
          subtitle={error.generic}
        />
      )}
      {isSucceed && (
        <InlineNotification
          kind="success"
          title={getUIElement("success")?.labelText || "Success"}
          subtitle={getUIElement("success")?.["aria-label"]}
        />
      )}
      <TextInput
        id="label"
        labelText={getUIElement("title")?.labelText || "Title"}
        placeholder={getUIElement("title")?.placeholder}
        onChange={setLabel}
        invalid={!!error?.label}
        invalidText={error?.label}
      />
      <TextArea
        id="body"
        labelText={getUIElement("body")?.labelText || "Body"}
        placeholder={getUIElement("body")?.placeholder}
        required
        onChange={setBody}
        invalid={!!error?.body}
        invalidText={error?.body}
      />

      <Button type="submit" size="field">
        {getUIElement("submit")?.labelText || "Submit"}
      </Button>
    </Form>
  );
};
