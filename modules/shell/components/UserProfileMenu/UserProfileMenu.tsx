import { useState, useEffect } from "react";
import {
  OverflowMenu,
  OverflowMenuItem,
  Loading,
} from "carbon-components-react";
import { Login32, UserProfile32 } from "@carbon/icons-react";
import { getUser, logout } from "@/modules/auth/client/";
import { IEntity } from "@/modules/model";
import { AssertClientSide, tryGetKeyLinks } from "@/modules/common/utils";
import { useRouter } from "next/router";

export interface IUserMenuProps {
  headerLinks?: (IEntity & { key: string })[];
}
export const UserProfileMenu = ({
  headerLinks,
}: IUserMenuProps): JSX.Element | null => {
  const [hasMounted, setHasMounted] = useState(false);
  const [user, loading] = getUser();

  const navigateMenu = (routeKey: string) => {
    if (AssertClientSide()) {
      const router = useRouter();
      const routePath = tryGetKeyLinks(routeKey, headerLinks);
      console.log(routePath);
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
            itemText={tryGetKeyLinks("loggedin", headerLinks) + `${user.name}`}
            hasDivider={false}
            onClick={() => navigateMenu("editprofile")}></OverflowMenuItem>
          <OverflowMenuItem
            aria-label={"Logout Component"}
            itemText={tryGetKeyLinks("logout", headerLinks)}
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
            itemText={tryGetKeyLinks("login", headerLinks)}></OverflowMenuItem>
        </OverflowMenu>
      )}
    </>
  );
};
