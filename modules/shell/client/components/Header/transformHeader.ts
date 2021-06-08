import { IAppStyled } from "@/modules/model";
import {
  findGroupInstance,
  findLabelInstance,
} from "@/modules/components/types";
import { IShellProps } from "@/modules/shell/types";
import { useRouter } from "next/router";

export interface IHeader extends Partial<IShellProps>, Partial<IAppStyled> {}
export function transformHeader({
  appstyle = "hedi-category-color--default",
  languageSwitchLinks,
  header,
  userMenu,
  shellConfig,
}: IHeader) {
  const router = useRouter();
  const { locale } = router;

  const headerLinks = shellConfig
    ? findGroupInstance(shellConfig, "header")
    : null;

  const userMenuLinks = shellConfig
    ? findGroupInstance(shellConfig, "userMenu")
    : null;
  const backToHome = shellConfig
    ? findLabelInstance(shellConfig, "menu_backToStart")
    : null;

  return {
    appstyle,
    languageSwitchLinks,
    headerLinks: headerLinks?.components || null,
    userMenuLinks: userMenuLinks?.components || null,
    shellConfig,
    locale,
    backToHome: backToHome?.text || "Zurück zur Startseite",
  };
}
