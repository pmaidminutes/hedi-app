import { Link as ILink } from "@/modules/model/components";
import { LinkPropsBase } from "carbon-components-react/lib/components/UIShell/Link";
export interface ILinkProps extends ILink, Omit<LinkPropsBase, "id"> {}
export function transformLink(props: ILinkProps) {
  const { labelText, ...rest } = props;
  return { labelText, ...rest };
}
