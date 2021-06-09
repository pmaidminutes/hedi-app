import { ILinkComponent } from "../../../types";
import { HTML } from "@/modules/react/html/HTML";
import { LinkPropsBase } from "carbon-components-react/lib/components/UIShell/Link";
export interface ILinkProps extends ILinkComponent, Omit<LinkPropsBase, "id"> {}
export function transformLink(props: ILinkProps) {
  const { labelText, ariaLabel, ...rest } = props;
  return {
    labelText: HTML({ data: labelText }),
    "aria-label": ariaLabel,
    ...rest,
  };
}
