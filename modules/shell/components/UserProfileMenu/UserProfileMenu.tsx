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
  tryGetKeyLabel,
  tryGetKeyLinks,
} from "@/modules/common/utils";
import { useRouter } from "next/router";
import { IShellLink } from "../../types/shellLinks";

export interface IUserMenuProps {
  userMenuLinks?: IShellLink[];
  headerLinks?: IShellLink[];
}
export const UserProfileMenu = ({
  userMenuLinks,
}: IUserMenuProps): JSX.Element | null => {
  const [hasMounted, setHasMounted] = useState(false);
  const [user, loading] = getUser();
  const router = useRouter();
  const navigateMenu = (routeKey: string) => {
    if (AssertClientSide()) {
      const routePath = tryGetKeyLinks(
        routeKey,
        userMenuLinks,
        "/" + router.locale
      );
      router.push(routePath);
    }
  };
  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : user ? (
        <OverflowMenu
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
            onClick={() => {
              logout;
              navigateMenu("logout");
            }}></OverflowMenuItem>
        </OverflowMenu>
      ) : (
        <OverflowMenu
          renderIcon={Login32}
          ariaLabel="User Profile Menu"
          size="xl"
          flipped={false}>
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
