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

export const UserFeedbackForm = ({
  elements,
}: {
  elements: IUIElementTexts[];
}) => {
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
          setError({});
        } else {
          setIsSucceed(false);
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

  const getUIElement = (identifier: string) => {
    return elements.find(item => item.identifier === identifier);
  };
  const titleInput = getTextInputProps("title", elements);

  return (
    <Form onSubmit={handleSubmit}>
      {error?.generic && (
        <InlineNotification
          kind="error"
          title={getUIElement("error")?.value || "Error"}
          subtitle={error.generic}
        />
      )}
      {isSucceed && (
        <InlineNotification
          kind="success"
          title={getUIElement("success")?.value || "Success"}
          subtitle={getUIElement("success")?.description}
        />
      )}
      <TextInput
        onChange={setLabel}
        invalid={!!error?.label}
        invalidText={error?.label}
        {...titleInput}
      />
      <TextArea
        id="body"
        labelText={getUIElement("body")?.value || "Body"}
        placeholder={getUIElement("body")?.placeholder}
        helperText={getUIElement("body")?.help}
        onChange={setBody}
        invalid={!!error?.body}
        invalidText={error?.body}
      />

      <Button type="submit" size="field">
        {getUIElement("submit")?.value || "Submit"}
      </Button>
    </Form>
  );
};
