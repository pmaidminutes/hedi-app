import React from "react";
import { Link as CarbonLink } from "carbon-components-react";
import { ILinkProps, transformLink } from "./transformLink";

export const Link = (props: ILinkProps) => {
  const { labelText, ...rest } = transformLink(props);

  return <CarbonLink {...rest}>{labelText}</CarbonLink>;
};
