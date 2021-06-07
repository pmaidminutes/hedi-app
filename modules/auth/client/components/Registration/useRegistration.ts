import { useRouter } from "next/router";
import { FormEvent, SyntheticEvent, useState, useEffect } from "react";
import { useAuthorizedRedirect } from "@/modules/react/hooks";
import { useTextInput } from "@/modules/react/hooks";
import { useRegister } from "../../../../registration/client/request";
import { useRegistrationError, useCredentialChange } from "../../../../registration/client/hooks";
import { IRegisterInfo } from "@/modules/registration/types";

export function useRegistration(redirectUrl: string) {
  const router = useRouter();

  const [registrationcode, setRegistrationcode] = useTextInput();
  const [name, setName] = useTextInput();
  const [pass, setPass] = useTextInput();
  const [isLoading, setIsLoading] = useState(false);

  const { response, loading, register, autoSignIn } = useRegister();
  const [info, setInfo] = useState<IRegisterInfo>();
  const {
    isCheckRegisterCodeError,
    handleCheckRegisterError,
  } = useRegistrationError(registrationcode);
  const [errors, setErrors] = useState(response?.errors);
  const [isSuccess, setIsSuccess] = useState(!!response?.success);
  const [hasUsernameError, setHasUsernameError] = useState(
    !!response.errors?.name
  );
  const [hasPasswordError, setHasPasswordError] = useState(
    !!response.errors?.pass
  );
  const [hasRegistrationCodeError, setHasRegistrationCodeError] = useState(
    !!response?.errors?.registrationcode
  );

  useEffect(() => {
    setErrors(response?.errors);
    setHasRegistrationCodeError(!!response?.errors?.registrationcode);
    setHasPasswordError(!!response.errors?.pass);
    setHasUsernameError(!!response.errors?.name);
    setIsSuccess(!!response?.success);
  }, [response]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (info && !loading) {
      info.registrationcode = registrationcode;
      await register({ ...info, lang: router.locale, commit: true });
      setIsLoading(false);
      handleCheckRegisterError();
    }
  };

  const { isCheckCredentialError } = useCredentialChange(
    name,
    pass,
    errors,
    setInfo
  );

  if (isSuccess) {
    autoSignIn({ ...info }, redirectUrl);
    router.push(redirectUrl);
  }

  const handleBackButtonClick = (e: SyntheticEvent) => {
    e.preventDefault();
    router.back();
  };
  useAuthorizedRedirect(redirectUrl);

  return {
    handleBackButtonClick,
    handleSubmit,
    setRegistrationcode,
    setName,
    setPass,
    registrationcode,
    isCheckRegisterCodeError,
    isCheckCredentialError,
    isLoading,
    isSuccess,
    hasRegistrationCodeError,
    hasPasswordError,
    hasUsernameError,
  };
}
