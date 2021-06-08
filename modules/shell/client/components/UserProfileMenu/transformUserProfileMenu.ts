import { AssertClientSide } from "@/modules/common/utils";
import { useRouter } from "next/router";
import { signOut } from "next-auth/client";
import {
  findLabelInstance,
  findLinkInstance,
  IComponent,
} from "@/modules/model/components";

export interface IUserMenuProps {
  userMenuLinks?: IComponent[];
  config?: IComponent[];
}
export function transformUserProfileMenu(props: IUserMenuProps) {
  const { userMenuLinks, config } = props;

  const menuTooltip = config
    ? findLabelInstance(config, "menu_userProfile")
    : null;
  const login = userMenuLinks ? findLinkInstance(userMenuLinks, "login") : null;

  const router = useRouter();
  const navigateMenu = (route: string) => {
    if (AssertClientSide()) {
      router.push(route);
    }
  };

  const logoutUser = () => {
    // signOut({ callbackUrl: callbackRoute });
    signOut();
  };

  return {
    menuTooltip: menuTooltip?.text || "MISSING TOOLTIP",
    navigateMenu,
    logoutUser,
    login,
  };
}
