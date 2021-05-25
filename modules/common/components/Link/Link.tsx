import { Link as ILink } from "@/modules/model/components";
import React from "react";

import { Link as CarbonLink } from "carbon-components-react";
import { LinkPropsBase } from "carbon-components-react/lib/components/UIShell/Link";

export interface ILinkProps extends ILink, Omit<LinkPropsBase, "id"> {}

export const Link = (props: ILinkProps) => {
  const { labelText } = props;

  return <CarbonLink {...props}>{labelText}</CarbonLink>;
};
