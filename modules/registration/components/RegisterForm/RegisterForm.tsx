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
  const [commit, setCommit] = useState(false);
  const { data, error } = useRegister(
    eagerValidate && info ? { ...info, commit } : {}
  );
  const response = data && !IsIHTTPError(data) ? data : undefined;
  const router = useRouter();

  const validCode = useValidate({ passcode: passcode });
  const passcodeData =
    validCode.data && !IsIHTTPError(validCode.data)
      ? validCode.data
      : undefined;
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCommit(passcodeData?.success ? true : false);
  };
  if (response?.success && passcodeData?.success) {
    eagerValidate = false;
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
