import { Link as ILink } from "@/modules/model/components";
import { LinkPropsBase } from "carbon-components-react/lib/components/UIShell/Link";
import React from "react";
import { HTML } from "@/modules/react/html";
export interface ILinkProps extends ILink, Omit<LinkPropsBase, "id"> {}
export function transformLink(props: ILinkProps) {
  const { labelText, ...rest } = props;
  return { labelText, ...rest };
}
