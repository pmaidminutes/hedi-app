import { getTextInputProps } from "@/modules/common/utils";
import { IUIElementTexts } from "@/modules/model";
import { useTextInput } from "@/modules/react/hooks";
import {
  Form,
  InlineNotification,
  TextInput,
  ToastNotification,
} from "carbon-components-react";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { useRegister, useValidate } from "../../request";
import { IRegisterInfo } from "../../types";
import { RegisterInputs } from "../RegisterInputs";

export const RegisterForm = ({
  elements,
  eagerValidate,
}: {
  elements: IUIElementTexts[];
  eagerValidate?: boolean;
}) => {
  const router = useRouter();
  // TODO handle error states more gracefully, errors should not persist
  const [passcode, setPasscode] = useTextInput();
  const [info, setInfo] = useState<IRegisterInfo>();

  const { response, loading, register } = useRegister();
  const { data: codeResponse } = useValidate({ passcode });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (codeResponse?.success && info && !loading)
      register({ ...info, lang: router.locale, commit: true });
  };

  if (response?.success && codeResponse?.success) {
    router.push("/" + router.locale);
  }

  return (
    <Form onSubmit={handleSubmit}>
      {response?.errors?.generic && (
        <InlineNotification
          kind="error"
          title="Error" //TODO pull from AppPages
          subtitle={response.errors.generic}
        />
      )}
      {response?.success && (
        <ToastNotification
          kind="success"
          lowContrast={true}
          title="Success"
          caption="Login created" //TODO pull from AppPages
          hideCloseButton={true}
          style={{ minWidth: "50rem", marginBottom: ".5rem" }}
        />
      )}

      <TextInput
        {...getTextInputProps("registrationcode", elements)}
        required
        onChange={setPasscode}
        invalid={!!codeResponse?.errors?.passcode}
        //invalidText={passcodeData?.errors?.passcode} TODO use with translations only
      />
      {!!passcode && (
        <RegisterInputs
          onChange={setInfo}
          errors={response?.errors}
          elements={elements}
        />
      )}
    </Form>
  );
};
