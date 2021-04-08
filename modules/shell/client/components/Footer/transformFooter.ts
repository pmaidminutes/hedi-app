import { IShellProps } from "@/modules/shell/types";
export interface IFooter extends Partial<IShellProps> {}

export function transformFooter(props: IFooter) {
  const { languageSwitchLinks, footer, shellConfig } = props;

  return { languageSwitchLinks, footer, shellConfig };
}
