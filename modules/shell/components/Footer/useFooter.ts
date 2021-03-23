import { IShellProps } from "@/modules/shell/types";
export interface IFooter extends Partial<IShellProps> {}

export function useFooter(props: IFooter) {
  const { languageSwitchLinks, links } = props;

  return { languageSwitchLinks, links };
}
