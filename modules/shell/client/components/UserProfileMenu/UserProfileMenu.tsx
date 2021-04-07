import { useState, useEffect } from "react";
import {
  OverflowMenu,
  OverflowMenuItem,
  Loading,
} from "carbon-components-react";
import { Login32, UserProfile32 } from "@carbon/icons-react";
import { getUser, logout } from "@/modules/auth/client/";
import {
  AssertClientSide,
  tryGet,
  tryGetKeyLabel,
  tryGetKeyLinks,
} from "@/modules/common/utils";
import { useRouter } from "next/router";
import { IShellLink } from "../../../types/shellLinks";
import { signOut } from "next-auth/client";
import { IUIElementTexts } from "@/modules/model";

export interface IUserMenuProps {
  userMenuLinks?: IShellLink[];
  config?: IUIElementTexts[];
}
export const UserProfileMenu = ({
  userMenuLinks,
  config,
}: IUserMenuProps): JSX.Element | null => {
  const [hasMounted, setHasMounted] = useState(false);
  const [user, loading] = getUser();
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
  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }
  const menuTooltip = tryGet("menu_userProfile", config)?.value;

  return (
    <>
      {loading ? (
        <Loading />
      ) : user ? (
        <OverflowMenu
          title={menuTooltip}
          iconDescription={menuTooltip}
          renderIcon={UserProfile32}
          ariaLabel="User Profile Menu"
          size="xl"
          flipped={true}>
          <OverflowMenuItem
            aria-label={"Profile Component"}
            itemText={
              tryGetKeyLabel("viewprofile", userMenuLinks) + ` ${user.name}`
            }
            hasDivider={false}
            onClick={() => navigateMenu("viewprofile")}></OverflowMenuItem>
          <OverflowMenuItem
            aria-label={"Logout Component"}
            itemText={tryGetKeyLabel("logout", userMenuLinks)}
            hasDivider={false}
            onClick={() => logoutUser()}></OverflowMenuItem>
        </OverflowMenu>
      ) : (
        <OverflowMenu
          title={menuTooltip}
          iconDescription={menuTooltip}
          renderIcon={Login32}
          ariaLabel="User Profile Menu"
          size="xl"
          flipped={true}>
          <OverflowMenuItem
            aria-label={"Login Component"}
            onClick={() => navigateMenu("login")}
            hasDivider={false}
            itemText={tryGetKeyLabel(
              "login",
              userMenuLinks
            )}></OverflowMenuItem>
        </OverflowMenu>
      )}
    </>
  );
};
