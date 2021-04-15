import { IAppStyled } from "@/modules/model";
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
  return {
    appstyle,
    languageSwitchLinks,
    headerLinks: header,
    userMenuLinks: userMenu,
    shellConfig,
    locale,
  };
}
