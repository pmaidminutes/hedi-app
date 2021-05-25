import { Button } from "@/modules/model/components";
import { ButtonDefaultProps } from "carbon-components-react";
export interface IButtonProps extends Omit<ButtonDefaultProps, "id">, Button {}

export function transformButton(props: IButtonProps):ButtonDefaultProps {
  const {
    kind,
    buttonKind,
    text,
    usage,
    labelText,
    ariaLabel,
    ...rest
  } = props;

  return {
    // TODO usage maybe not meant for this?
    type: usage,
    value: text ? text : labelText ? labelText : "",
    "aria-label": ariaLabel,
    ...rest,
  };
}
