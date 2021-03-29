import { IShellProps } from "@/modules/shell/types";
export interface IFooter extends Partial<IShellProps> {}

export function useFooter(props: IFooter) {
  const { languageSwitchLinks, footer, shellConfigs } = props;

  return { languageSwitchLinks, footer, shellConfigs };
}
