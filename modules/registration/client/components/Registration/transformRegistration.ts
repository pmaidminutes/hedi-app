import {
  findBodyInstance,
  findButtonInstance,
  findInlineNotificationInstance,
  findLinkInstance,
  findTextInputInstance,
} from "@/modules/model/components";
import { IRegistration } from "@/modules/registration/types";

export function transformRegistration(props: IRegistration) {
  const { components } = props;

  const text = findBodyInstance(components, "text");
  const code = findTextInputInstance(components, "registrationcode");
  const username = findTextInputInstance(components, "username");
  const password = findTextInputInstance(components, "password");
  const back = findButtonInstance(components, "back");
  const submit = findButtonInstance(components, "submit");
  const invalid = findInlineNotificationInstance(components, "invalid");
  const success = findInlineNotificationInstance(components, "success");
  const error = findInlineNotificationInstance(components, "error");
  const redirect = findLinkInstance(components, "editprofile");
  const redirectUrl = redirect?.href || "";
  const invalidText = invalid?.title || "";


  return {
    username,
    password,
    back,
    submit,
    invalidText,
    success,
    error,
    redirectUrl,
    text,
    code,
  };
}
