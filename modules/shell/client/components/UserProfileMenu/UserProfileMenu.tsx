import { useState, useEffect, useContext } from "react";
import {
  OverflowMenu,
  OverflowMenuItem,
  Loading,
} from "carbon-components-react";
import { Login32, UserProfile32 } from "@carbon/icons-react";
import { getUser } from "@/modules/auth/client/";
import {
  transformUserProfileMenu,
  IUserMenuProps,
} from "./transformUserProfileMenu";
import { ShellContext } from "../../contexts";

export const UserProfileMenu = (props: IUserMenuProps): JSX.Element | null => {
  const {
    menuTooltip,
    login,
    navigateMenu,
    logoutUser,
  } = transformUserProfileMenu(props);

  const [hasMounted, setHasMounted] = useState(false);
  const [user, isLoading] = getUser();
  const { isRTL } = useContext(ShellContext);
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
          flipped={!isRTL}>
          <OverflowMenuItem
            aria-label={"Logout Component"}
            itemText={"Logout"}
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
          {login && (
            <OverflowMenuItem
              aria-label={login.ariaLabel}
              onClick={() => navigateMenu(login.href)}
              hasDivider={false}
              itemText={login.labelText}></OverflowMenuItem>
          )}
        </OverflowMenu>
      )}
    </>
  );
};
