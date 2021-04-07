import { getTextInputProps, tryGet, tryGetValue } from "@/modules/common/utils";
import { IUIElementTexts } from "@/modules/model";
import { useTextInput } from "@/modules/react/hooks";
import {
  Form,
  InlineLoading,
  TextInput,
  ToastNotification,
} from "carbon-components-react";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { useRegister, useValidate } from "../../request";
import { IRegisterInfo } from "../../../types";
import { RegisterInputs } from "../RegisterInputs";

export const RegisterForm = ({
  elements,
  eagerValidate,
  redirect,
}: {
  elements: IUIElementTexts[];
  eagerValidate?: boolean;
  redirect: string;
}) => {
  const router = useRouter();
  // TODO handle error states more gracefully, errors should not persist
  const [passcode, setPasscode] = useTextInput();
  const [info, setInfo] = useState<IRegisterInfo>();

  const { response, loading, register, autoSignIn } = useRegister();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (info && !loading) {
      info.passcode = passcode;
      register({ ...info, lang: router.locale, commit: true });
    }
  };

  if (response?.success) {
    autoSignIn({ ...info }, redirect);
    router.push(redirect);
  }

  return (
    <Form onSubmit={handleSubmit}>
      {response?.errors?.generic && (
        <ToastNotification
          kind="error"
          lowContrast={true}
          title={tryGetValue("error_message", elements, "Error")}
          subtitle={tryGet("error_message", elements)?.description}
          hideCloseButton={true}
          style={{ width: "100%", marginBottom: ".5rem" }}
        />
      )}
      {response?.success && (
        <ToastNotification
          kind="success"
          lowContrast={true}
          title={tryGetValue("success_message", elements, "")}
          subtitle={tryGet("success_message", elements)?.description}
          caption={<InlineLoading status="active" />}
          hideCloseButton={true}
          style={{ width: "100%", marginBottom: ".5rem" }}
        />
      )}

      <TextInput
        {...getTextInputProps("registrationcode", elements)}
        required
        onChange={setPasscode}
        invalid={!!response?.errors?.passcode}
        invalidText={tryGetValue("invalid_passcode", elements)}
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
