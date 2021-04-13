import { IUIElementTexts } from "@/modules/model";
import { IShellLink } from "@/modules/shell/types/shellLinks";
import {
  AssertClientSide,
  getUIElement,
  getLinkLabel,
  getMenuLinkLabel,
} from "@/modules/common/utils";
import { useRouter } from "next/router";
import { signOut } from "next-auth/client";

export interface IUserMenuProps {
  userMenuLinks?: IShellLink[];
  config?: IUIElementTexts[];
}
export function transformUserProfileMenu(props: IUserMenuProps) {
  const { userMenuLinks, config } = props;

  const menuTooltip = getUIElement("menu_userProfile", config)?.value;
  const loginText = getMenuLinkLabel("login", userMenuLinks);
  const logoutText = getMenuLinkLabel("logout", userMenuLinks);
  const viewprofileText = getMenuLinkLabel("viewprofile", userMenuLinks);

  const router = useRouter();
  const navigateMenu = (routeKey: string) => {
    if (AssertClientSide()) {
      const routePath =
        userMenuLinks?.find(l => l.key === routeKey)?.route ??
        "/" + router.locale;
      router.push(routePath);
    }
  };

  const logoutUser = () => {
    const callbackRoute = getLinkLabel(
      "logout",
      userMenuLinks,
      "/" + router.locale
    );
    signOut({ callbackUrl: callbackRoute });
  };

  return {
    menuTooltip,
    navigateMenu,
    logoutUser,
    loginText,
    logoutText,
    viewprofileText,
  };
}
