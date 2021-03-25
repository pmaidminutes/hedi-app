import { IAppStyled } from "@/modules/model";
import { IShellProps } from "@/modules/shell/types";

export interface IHeader extends Partial<IShellProps>, Partial<IAppStyled> {}
export function useHeader({
  appstyle = "hedi-category-color--default",
  languageSwitchLinks,
  header,
}: IHeader) {
  return { appstyle, languageSwitchLinks, headerLinks: header };
}
