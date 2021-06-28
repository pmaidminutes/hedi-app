import { ILinkComponent } from "../../../types";
import { HTML } from "@/modules/react/html/HTML";
import { LinkProps } from "carbon-components-react/lib/components/UIShell/Link";
import { PartialBy } from "@/modules/common/utils";

export type ILinkProps = PartialBy<ILinkComponent, "kind"> &
  Omit<LinkProps, "id">;

export function transformLink(props: ILinkProps) {
  const { kind, labelText, ariaLabel, ...rest } = props;
  return {
    labelText: HTML({ data: labelText }),
    "aria-label": ariaLabel,
    ...rest,
  };
}
