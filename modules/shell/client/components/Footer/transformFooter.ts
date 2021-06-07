import { findGroupInstance } from "@/modules/model/components";
import { IShellProps } from "@/modules/shell/types";
export interface IFooter extends Partial<IShellProps> {}

export function transformFooter(props: IFooter) {
  const { languageSwitchLinks, shellConfig } = props;

  const footerLinks = shellConfig
    ? findGroupInstance(shellConfig, "footer")
    : null;

  return {
    languageSwitchLinks,
    footer: footerLinks?.components || null,
    shellConfig,
  };
}
