import {
  findButtonInstance,
  findLinkInstance,
  findTextInputInstance,
  findInlineNotificationInstance,
  findLabelInstance,
} from "@/modules/model/components";

import { ILogin } from "../../../types";

export function transformLogin(props: ILogin) {
  const { components } = props;

  const username = findTextInputInstance(components, "username");
  const password = findTextInputInstance(components, "password");
  const success = findInlineNotificationInstance(components, "success");
  const invalid = findInlineNotificationInstance(components, "invalid");
  const submit = findButtonInstance(components, "submit");
  const register = findLinkInstance(components, "register");
  const back = findButtonInstance(components, "back");
  const hint = findLabelInstance(components, "hint");
  const redirect = findLinkInstance(components, "editprofile");
  const redirectUrl = redirect?.href || "";

  return {
    username,
    password,
    success,
    invalid,
    submit,
    register,
    back,
    hint,
    redirectUrl,
  };
}
