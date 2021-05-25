import { Button } from "@/modules/model/components";
import { ButtonDefaultProps } from "carbon-components-react";
export interface IButtonProps extends Omit<ButtonDefaultProps, "id">, Button {}

export function transformButton(props: IButtonProps) {
  const { buttonKind, id, text, usage, iconDescription, labelText } = props;

  return {
    kind: buttonKind,
    type: usage,
    text: text ? text : labelText ? labelText : "nix",
  };
}
