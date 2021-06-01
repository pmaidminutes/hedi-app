import { Button } from "@/modules/model/components";
import { ButtonDefaultProps } from "carbon-components-react";
import { HTML } from "@/modules/react/html";
export interface IButtonProps extends Omit<ButtonDefaultProps, "id">, Button {}

export function transformButton(props: IButtonProps) {
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
    type:
      usage === "submit" ? "submit" : usage === "reset" ? "reset" : "button",
    kind: buttonKind,
    text: text
      ? HTML({ data: text })
      : labelText
      ? HTML({ data: labelText })
      : "",
    "aria-label": ariaLabel,
    ...rest,
  };
}
