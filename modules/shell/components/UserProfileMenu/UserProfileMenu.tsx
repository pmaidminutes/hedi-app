import { LogInModal } from "@/modules/auth/client/components";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import {
  OverflowMenu,
  OverflowMenuItem,
  Loading,
} from "carbon-components-react";
import { UserProfile32 } from "@carbon/icons-react";
import { getUser, logout } from "@/modules/auth/client/";

export const UserProfileMenu = (): JSX.Element | null => {
  const [hasMounted, setHasMounted] = useState(false);
  const [user, loading] = getUser();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return (
    <>
      {ReactDOM.createPortal(
        <LogInModal open={open} onClose={() => setOpen(false)} />,
        document.body
      )}
      <OverflowMenu
        renderIcon={UserProfile32}
        ariaLabel="User Profile Menu"
        size="xl"
        flipped={true}>
        {loading ? (
          <Loading />
        ) : user ? (
          <OverflowMenuItem
            aria-label={"Login Component"}
            itemText={`logged in as ${user.name}`}
            hasDivider={false}
            onClick={logout}></OverflowMenuItem>
        ) : (
          <OverflowMenuItem
            onClick={() => setOpen(true)}
            itemText={"Login"}></OverflowMenuItem>
        )}
      </OverflowMenu>
    </>
  );
};
