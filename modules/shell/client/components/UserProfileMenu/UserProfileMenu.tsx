import { useState, useEffect } from "react";
import {
  OverflowMenu,
  OverflowMenuItem,
  Loading,
} from "carbon-components-react";
import { Login32, UserProfile32 } from "@carbon/icons-react";
import { getUser, logout } from "@/modules/auth/client/";
import {
  transformUserProfileMenu,
  IUserMenuProps,
} from "./transformUserProfileMenu";

export const UserProfileMenu = (props: IUserMenuProps): JSX.Element | null => {
  const {
    menuTooltip,
    navigateMenu,
    logoutUser,
    loginText,
    logoutText,
    viewprofileText,
  } = transformUserProfileMenu(props);

  const [hasMounted, setHasMounted] = useState(false);
  const [user, isLoading] = getUser();
  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return (
    <>
      {isLoading ? (
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
            itemText={viewprofileText + ` ${user.name}`}
            hasDivider={false}
            onClick={() => navigateMenu("viewprofile")}></OverflowMenuItem>
          <OverflowMenuItem
            aria-label={"Logout Component"}
            itemText={logoutText}
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
            itemText={loginText}></OverflowMenuItem>
        </OverflowMenu>
      )}
    </>
  );
};
