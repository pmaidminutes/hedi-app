import React from "react";
import Link from "next/link";
import { Button as CarbonButton } from "carbon-components-react";
import { transformButton, IButtonProps } from "./transformButton";

export const Button = (props: IButtonProps) => {
  const { text, href, ...rest } = transformButton(props);
  if (href)
    return (
      <Link href={href} passHref>
        <CarbonButton {...rest}>{text}</CarbonButton>
      </Link>
    );
  else return <CarbonButton {...rest}>{text}</CarbonButton>;
};
