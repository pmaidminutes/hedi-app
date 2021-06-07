import React from "react";
import { default as NextLink } from "next/link";
import { Link as CarbonLink } from "carbon-components-react";
import { ILinkProps, transformLink } from "./transformLink";

export const Link = (props: ILinkProps) => {
  const { labelText, href, ...rest } = transformLink(props);

  return (
    <NextLink href={href} passHref>
      <CarbonLink {...rest}>{labelText}</CarbonLink>
    </NextLink>
  );
};
