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
import { useRegister } from "../../request";
import { IRegisterInfo } from "../../../types";
import { RegisterInputs } from "../RegisterInputs";
import { useRegistrationError } from "../../hooks/useRegistrationError";

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

  const [registrationcode, setRegistrationcode] = useTextInput();
  const [info, setInfo] = useState<IRegisterInfo>();
  const { response, loading, register, autoSignIn } = useRegister();
  const {
    isCheckRegisterCodeError,
    handleCheckRegisterError,
  } = useRegistrationError(registrationcode);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (info && !loading) {
      info.registrationcode = registrationcode;
      await register({ ...info, lang: router.locale, commit: true });
      handleCheckRegisterError();
    }
  };

  if (response?.success) {
    autoSignIn({ ...info }, redirect);
    router.push(redirect);
  }

  return (
    <Form onSubmit={handleSubmit}>
      {isCheckRegisterCodeError && response?.errors?.generic && (
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
        onChange={setRegistrationcode}
        invalid={
          isCheckRegisterCodeError && !!response?.errors?.registrationcode
        }
        invalidText={tryGetValue("invalid_passcode", elements)}
      />
      {!!registrationcode && (
        <RegisterInputs
          onChange={setInfo}
          errors={response?.errors}
          elements={elements}
        />
      )}
    </Form>
  );
};
