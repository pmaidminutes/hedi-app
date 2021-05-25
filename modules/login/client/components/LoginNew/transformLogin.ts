import {
  findButtonInstance,
  findLinkInstance,
  findNotificationInstance,
  findTextInputInstance,
} from "@/modules/model/components";
import { IPage } from "@/modules/page/types";

export interface ILogin extends IPage {}
export function transformLogin(props: ILogin) {
  const { components } = props;

  const username = findTextInputInstance(components, "username");
  const password = findTextInputInstance(components, "password");
  const success = findNotificationInstance(components, "success");
  const invalid = findNotificationInstance(components, "invalid");
  const submit = findButtonInstance(components, "submit");
  const register = findLinkInstance(components, "register");
  const back = findButtonInstance(components, "back");

  return { username, password, success, invalid, submit, register, back };
}
