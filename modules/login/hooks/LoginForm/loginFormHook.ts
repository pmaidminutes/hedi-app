import { login } from "@/modules/auth/client";
import { getTextInputProps, tryGetValue } from "@/modules/common/utils";
import {
  ILoginFormLayoutProps,
  LoginFormProps,
} from "@/modules/login/client/components";
import { IUIElementTexts } from "@/modules/model";
import { FormEventHandler, useEffect, useState } from "react";

const getLoginFormProps = (
  elements: IUIElementTexts[]
): ILoginFormLayoutProps => ({
  usernameInput: getTextInputProps("username", elements),
  passwordInput: getTextInputProps("password", elements),
  submitButtonText: tryGetValue("submit", elements),
  backButtonText: tryGetValue("back", elements),
  invalidUserText: tryGetValue("invalid", elements),
});

export const useLoginForm = ({
  elements,
  lang,
}: LoginFormProps): ILoginFormLayoutProps => {
  const [loginFormProps, setLoginFormProps] = useState(
    getLoginFormProps(elements)
  );

  useEffect(() => {
    setLoginFormProps(getLoginFormProps(elements));
  }, [lang]);

  return loginFormProps;
};
