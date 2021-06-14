import { IButtonComponent } from "../../../types";
import { ButtonDefaultProps } from "carbon-components-react";
import { HTML } from "@/modules/react/html";
import { PartialBy } from "@/modules/common/utils";

export type IButtonProps = PartialBy<IButtonComponent, "kind" | "usage"> &
  Omit<ButtonDefaultProps, "id" | "href">;

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
