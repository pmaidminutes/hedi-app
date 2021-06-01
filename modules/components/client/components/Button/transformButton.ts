import { Button } from "@/modules/model/components";
import { ButtonDefaultProps } from "carbon-components-react";
import { HTML } from "@/modules/react/html";
export interface IButtonProps extends Omit<ButtonDefaultProps, "id">, Button {}

export function transformButton(props: IButtonProps) {
  console.log({props})
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
    kind:buttonKind,
    text: text
      ? HTML({ data: text })
      : labelText
      ? HTML({ data: labelText })
      : "",
    "aria-label": ariaLabel,
    ...rest,
  };
}
