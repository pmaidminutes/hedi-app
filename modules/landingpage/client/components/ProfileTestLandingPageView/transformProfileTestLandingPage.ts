import {
  findBodyInstance,
  findButtonInstance,
  findLabelInstance,
  findLinkInstance,
} from "@/modules/components/types";
import { IPage } from "@/modules/page/types";

export function transformProfileTestLandingPage(content: IPage) {
  const { components } = content;

  return {
    body: findBodyInstance(components, "body"),
    registerLabel: findLabelInstance(components, "registerLabel"),
    registerButton: findButtonInstance(components, "registerButton"),
    registerHref: findLinkInstance(components, "registerLink")?.href,
    loginLabel: findLabelInstance(components, "loginLabel"),
    loginButton: findButtonInstance(components, "loginButton"),
    loginHref: findLinkInstance(components, "loginLink")?.href,
    editProfileButton: findButtonInstance(components, "editProfileButton"),
    editProfileHref: findLinkInstance(components, "editProfileLink")?.href,
  };
}
