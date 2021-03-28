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
}

export function useLoginForm({ elements, lang, redirectUrl }: LoginFormProps) {
  const router = useRouter();
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const handleSubmit: FormEventHandler<HTMLFormElement> = event => {
    if (redirectUrl) router.prefetch(redirectUrl);
    setLoginLoading(true);
    submitLogin(event, redirectUrl).then(resp => {
      setLoginLoading(false);
      if (!resp.ok) setLoginError(true);
    });
  };

  const [elementProps, setElementProps] = useState(
    getElementProps(elements, setLoginError)
  );

  useEffect(() => {
    setElementProps(getElementProps(elements, setLoginError));
  }, [lang]);

  const { loginNotification, ...rest } = elementProps;
  return {
    ...rest,
    handleSubmit,
    loginLoading,
    loginNotification: loginError ? loginNotification : undefined,
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
