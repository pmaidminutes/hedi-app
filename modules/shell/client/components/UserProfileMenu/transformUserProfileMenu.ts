import { IUIElementTexts } from "@/modules/model";
import { IShellLink } from "@/modules/shell/types/shellLinks";
import {
  tryGet,
  AssertClientSide,
  tryGetKeyLinks,
  tryGetKeyLabel,
} from "@/modules/common/utils";
import { useRouter } from "next/router";
import { signOut } from "next-auth/client";

export interface IUserMenuProps {
  userMenuLinks?: IShellLink[];
  config?: IUIElementTexts[];
}
export function transformUserProfileMenu(props: IUserMenuProps) {
  const { userMenuLinks, config } = props;

  const menuTooltip = tryGet("menu_userProfile", config)?.value;
  const loginText = tryGetKeyLabel("login", userMenuLinks);
  const logoutText = tryGetKeyLabel("logout", userMenuLinks);
  const viewprofileText = tryGetKeyLabel("viewprofile", userMenuLinks);

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
    const callbackRoute = tryGetKeyLinks(
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
