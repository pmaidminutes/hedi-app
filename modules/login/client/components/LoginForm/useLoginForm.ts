import {
  ChangeEventHandler,
  FormEvent,
  FormEventHandler,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import {
  TextInputProps,
  ToastNotificationProps,
} from "carbon-components-react";
import { IUIElementTexts } from "@/modules/model";
import { getTextInputProps, tryGet, tryGetValue } from "@/modules/common/utils";
import { login } from "@/modules/auth/client";
import { LoginFormProps } from "..";
import { useRouter } from "next/router";

export interface ILoginFormElementProps {
  usernameInput: TextInputProps & {
    onChange?: ChangeEventHandler<HTMLInputElement>;
  };
  passwordInput: TextInputProps & {
    onChange?: ChangeEventHandler<HTMLInputElement>;
  };
  submitButtonText: string;
  handleSubmit: FormEventHandler<HTMLFormElement>;
  loginLoading?: boolean;
  loginNotification?: ToastNotificationProps;
  successNotification?: ToastNotificationProps;
}

export function useLoginForm({
  elements,
  lang,
  redirectUrl,
  links,
}: LoginFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit: FormEventHandler<HTMLFormElement> = event => {
    if (redirectUrl) router.prefetch(redirectUrl);
    setIsLoading(true);
    setHasError(false);
    setIsSuccess(false);
    submitLogin(event, redirectUrl).then(resp => {
      setIsLoading(false);
      if (!resp.ok) setHasError(true);
      else setIsSuccess(true);
    });
  };

  const [elementProps, setElementProps] = useState(
    getElementProps(elements, setHasError)
  );

  useEffect(() => {
    setElementProps(getElementProps(elements, setHasError));
  }, [lang]);

  const { loginNotification, successNotification, ...rest } = elementProps;
  // TODO mod links and elements here in hook
  return {
    ...rest,
    handleSubmit,
    isLoading,
    loginNotification: hasError ? loginNotification : undefined,
    successNotification: isSuccess ? successNotification : undefined,
    links,
    elements,
  };
}

function getElementProps(
  elements: IUIElementTexts[],
  setLoginError: (value: SetStateAction<boolean>) => void
): Omit<ILoginFormElementProps, "handleSubmit"> {
  const usernameInput = {
    ...getTextInputProps("username", elements),
    onChange: () => setLoginError(false),
  };
  const passwordInput = {
    ...getTextInputProps("password", elements),
    onChange: () => setLoginError(false),
  };
  return {
    usernameInput,
    passwordInput,
    submitButtonText: tryGetValue("submit", elements),
    loginNotification: {
      title: tryGetValue("invalid", elements),
      caption: tryGet("invalid", elements)?.description,
    },
    successNotification: {
      title: tryGetValue("success", elements),
      subtitle: tryGet("success", elements)?.description,
    },
  };
}

function submitLogin(event: FormEvent<HTMLFormElement>, redirectUrl?: string) {
  event.preventDefault();
  const {
    username: { value: username },
    password: { value: password },
  } = event.target as typeof event.target & {
    username: { value: string };
    password: { value: string };
  };
  return login(username, password, redirectUrl);
}
