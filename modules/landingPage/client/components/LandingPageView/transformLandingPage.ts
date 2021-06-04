import {
  findBodyInstance,
  findButtonInstance,
  findLabelInstance,
  findLinkInstance,
} from "@/modules/model/components";
import { IPage } from "@/modules/page/types";

export function transformLandingPage(content: IPage) {
  const { components } = content;

  return {
    body: findBodyInstance(components, "text"),
    aboveRegister: findLabelInstance(components, "aboveRegister"),
    register: findButtonInstance(components, "register"),
    registerHref: findLinkInstance(components, "registerLink")?.href,
    aboveLogin: findLabelInstance(components, "aboveLogin"),
    login: findButtonInstance(components, "login"),
    loginHref: findLinkInstance(components, "loginLink")?.href,
    editProfile: findButtonInstance(components, "editProfile"),
    editProfileHref: findLinkInstance(components, "editProfileLink")?.href,
  };
}
