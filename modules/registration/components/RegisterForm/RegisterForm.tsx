import { IsIHTTPError } from "@/modules/common/error";
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
  const [passcode, setPasscode] = useTextInput();

  const [info, setInfo] = useState<IRegisterInfo>();
  const { response, loading, register } = useRegister();

  const { data: codeResponse } = useValidate({ passcode });
  const passcodeData =
    codeResponse && !IsIHTTPError(codeResponse) ? codeResponse : undefined;
  const router = useRouter();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (passcodeData?.success && info && !loading)
      register({ ...info, lang: router.locale, commit: true });
  };

  if (response?.success && passcodeData?.success) {
    router.push("/" + router.locale);
  }

  return (
    <Form onSubmit={handleSubmit}>
      {response?.errors?.generic && (
        <InlineNotification
          kind="error"
          title="Error"
          subtitle={response.errors.generic}
        />
      )}
      {response?.success && (
        <ToastNotification
          kind="success"
          lowContrast={true}
          title="Success"
          caption="Login created"
          hideCloseButton={true}
          style={{ minWidth: "50rem", marginBottom: ".5rem" }}
        />
      )}

      <TextInput
        {...getTextInputProps("registrationcode", elements)}
        required
        onChange={setPasscode}
        type="password"
        invalid={!!passcodeData?.errors?.passcode}
        invalidText={passcodeData?.errors?.passcode}
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
