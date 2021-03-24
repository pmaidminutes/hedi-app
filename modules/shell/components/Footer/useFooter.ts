import { IShellProps } from "@/modules/shell/types";
import { FieldsOnCorrectTypeRule } from "graphql";
export interface IFooter extends Partial<IShellProps> {}

export function useFooter(props: IFooter) {
  const { languageSwitchLinks, footer } = props;

  return { languageSwitchLinks, footer };
}
