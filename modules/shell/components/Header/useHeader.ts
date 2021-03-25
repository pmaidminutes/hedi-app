import { IAppStyled } from "@/modules/model";
import { IShellProps } from "@/modules/shell/types";

export interface IHeader extends Partial<IShellProps>, Partial<IAppStyled> {}
export function useHeader({
  header,
  appstyle = "hedi-category-color--default",
  languageSwitchLinks,
}: IHeader) {
  return { header, appstyle, languageSwitchLinks };
}
