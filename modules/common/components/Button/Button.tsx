import React from "react";
import { transformButton, IButtonProps } from "./transformButton";
import { Button as CarbonButton } from "carbon-components-react";
export const Button = (props: IButtonProps) => {
  const { value, ...rest } = transformButton(props);

  return (
    <CarbonButton {...rest}>
     {value}
    </CarbonButton>
  );
};
